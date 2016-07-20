# similarity search utility

import sys, argparse, json
sys.path.append('../src')

import logging
logger = logging.getLogger(__name__)
from dnn_feature_extractor import DNNModel, DNNFeatureExtractor
from text_embedding import TextEmbedding
from metadata import MetadataExtractor
from file_utils import list_files
from generators import generator_lk
from ensembling import EnsemblingScores

parser = argparse.ArgumentParser()
parser.add_argument('--input-imgs',help='repository with images to be indexed')
parser.add_argument('--generators',help='list of comma-separated generators',nargs='+',type=str)
parser.add_argument('--indexes-repo',help='repository of indexes for generators')
parser.add_argument('--models-repo',help='repository hosting the models')
parser.add_argument('--json-output',help='JSON output file',default='match.json')
parser.add_argument('--batch-size',help='prediction batch size',type=int,default=8)
parser.add_argument('--nfiles',help='processes only the x first files',type=int,default=-1)
parser.add_argument('--nmatches',help='max final number of matches per reference image',type=int,default=20)
args = parser.parse_args()

image_files = list_files(args.input_imgs,ext='.jpg',nfiles=args.nfiles)
json_files = list_files(args.input_imgs,ext='.json',nfiles=args.nfiles)

def execute_generator(generator,jdataout={},meta_in='',meta_out=''):
    generator_conf = generator_lk.get(generator,None)
    if not generator_conf:
        logger.error('Unknown generator ' + generator + ', skipping')
        return
    model_repo = args.models_repo + '/' + generator_conf['name']
    if generator_conf['type'] == 'dnn':
        dnnmodel = DNNModel(name=generator,model_repo=model_repo,nclasses=generator_conf['nclasses'],extract_layer=generator_conf.get('extract_layer',''),best=generator_conf.get('best',0),description=generator_conf['description'])
        dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo,batch_size=generator_conf.get('batch_size',args.batch_size),meta_in=meta_in,meta_out=meta_out)
        return dnnfe.search(jdataout)
    elif generator_conf['type'] == 'w2v':
        txtembed = TextEmbedding(json_files,model_repo=model_repo,model_file=generator_conf['file'],index_repo=args.indexes_repo,tate=False,img_files=image_files,meta_in=meta_in,meta_out=meta_out)
        txtembed.preproc()
        return txtembed.search(jdataout)
    elif generator_conf['type'] != 'meta':
        logger.error('Unknown generator type ' + generator_conf['type'])
    return

# to final format, i.e. an array instead of a dict
def format_to_array(dict_out):
    json_out = []
    for k,v in dict_out.iteritems():
        c = 0
        vout = sorted(v['output'], key=lambda x: x['features']['score'],reverse=True)
        out = []
        for m in vout:
            if c <= args.nmaches:
                out.append(m)
            c = c + 1
        v['output'] = out
        json_out.append(v)
    return json_out

json_out = ''

## execute metadata generator first
metad = MetadataExtractor(json_files,index_repo=args.indexes_repo,tate=False)
metad.preproc()
metad.index()
meta_in = args.indexes_repo + '/metadata/names.bin'
meta_out = args.indexes_repo + '/metadata/out_names.bin'

generators = args.generators
if generators[0] == 'all':
    generators = generator_lk.keys()
for gen in generators:
    json_out = execute_generator(gen,meta_in=meta_in,meta_out=meta_out)
es = EnsemblingScores()
json_out = es.ensembling(json_out)
json_out = format_to_array(json_out)
with open(args.json_output,'w') as fout:
    json.dump(json_out,fout)
