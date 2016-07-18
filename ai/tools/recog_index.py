# indexing utility

import sys, argparse
sys.path.append('../src')

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
from dnn_feature_extractor import DNNModel, DNNFeatureExtractor
from text_embedding import TextEmbedding
from metadata import MetadataExtractor
from file_utils import list_files
from generators import generator_lk

parser = argparse.ArgumentParser()
parser.add_argument('--input-imgs',help='repository with images to be indexed')
parser.add_argument('--generators',help='list of comma-separated generators',nargs='+',type=str)
parser.add_argument('--indexes-repo',help='repository of indexes for generators')
parser.add_argument('--models-repo',help='repository hosting the models')
parser.add_argument('--batch-size',help='prediction batch size',type=int,default=8)
args = parser.parse_args()

def execute_generator(generator):
    generator_conf = generator_lk.get(generator,None)
    if not generator_conf:
        logger.error('Unknown generator ' + generator + ', skipping')
        return
    model_repo = args.models_repo + '/' + generator_conf['name']
    if generator_conf['type'] == 'dnn':
        dnnmodel = DNNModel(name=generator,model_repo=model_repo,nclasses=generator_conf['nclasses'],extract_layer=generator_conf.get('extract_layer',''),best=generator_conf.get('best',0),description=generator_conf['description'])
        dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo,batch_size=generator_conf.get('batch_size',args.batch_size))
        dnnfe.index()
    elif generator_conf['type'] == 'w2v':
        txtembed = TextEmbedding(json_files,model_repo=model_repo,model_file=generator_conf['file'],index_repo=args.indexes_repo)
        txtembed.preproc()
        txtembed.index()
    elif generator_conf['type'] == 'meta':
        metad = MetadataExtractor(json_files,index_repo=args.indexes_repo)
        metad.preproc()
        metad.index()
    else:
        logger.error('Unknown generator type ' + generator_conf['type'])
    return

image_files = list_files(args.input_imgs,ext='.jpg')
json_files = list_files(args.input_imgs,ext='.json')

# execute index() on every generator
#print args.generators
generators = args.generators
if generators[0] == 'all':
    generators = generator_lk.keys()
for gen in generators:
    execute_generator(gen)
