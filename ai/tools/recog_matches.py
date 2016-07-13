# similarity search utility

import sys, argparse, json
sys.path.append('../src')

import logging
logger = logging.getLogger(__name__)
from dnn_feature_extractor import DNNModel, DNNFeatureExtractor
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
args = parser.parse_args()

image_files = list_files(args.input_imgs,ext='.jpg')

def execute_generator(generator,jdataout={}):
    generator_conf = generator_lk.get(generator,None)
    if not generator_conf:
        logger.error('Unknown generator ' + generator + ', skipping')
        return
    dnnmodel = DNNModel(name=generator,model_repo=args.models_repo + '/' + generator_conf['name'],nclasses=generator_conf['nclasses'],extract_layer=generator_conf.get('extract_layer',''),best=generator_conf.get('best',0),description=generator_conf['description'])
    dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo,batch_size=generator_conf.get('batch_size',args.batch_size))
    return dnnfe.search(jdataout)

# to final format, i.e. an array instead of a dict
def format_to_array(dict_out):
    json_out = []
    for k,v in dict_out.iteritems():
        json_out.append(v)
    return json_out

json_out = ''
generators = args.generators
if generators[0] == 'all':
    generators = generator_lk.keys()
for gen in generators:
    json_out = execute_generator(gen)
json_out = format_to_array(json_out)
es = EnsemblingScores()
json_out = es.ensembling(json_out)
with open(args.json_output,'w') as fout:
    json.dump(json_out,fout)
