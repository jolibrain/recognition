# indexing utility

import sys, argparse
sys.path.append('../src')

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
##TODO: import generators (i.e. header with all import ?)
from dnn_feature_extractor import DNNModel, DNNFeatureExtractor
from file_utils import list_images
from generators import generator_lk

parser = argparse.ArgumentParser()
parser.add_argument('--input-imgs',help='repository with images to be indexed')
parser.add_argument('--generators',help='list of comma-separated generators',nargs='+',type=str)
parser.add_argument('--indexes-repo',help='repository of indexes for generators')
parser.add_argument('--models-repo',help='repository hosting the models')
args = parser.parse_args()

def execute_generator(generator):
    ##TODO
    #- if generator == etc...
    generator_conf = generator_lk.get(generator,None)
    if not generator_conf:
        logger.error('Unknown generator ' + generator + ', skipping')
        return
    dnnmodel = DNNModel(name=generator,model_repo=args.models_repo + '/' + generator_conf['name'],nclasses=generator_conf['nclasses'],extract_layer=generator_conf.get('extract_layer',''),best=generator_conf.get('best',0),description=generator_conf['description'])
    dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo)
    dnnfe.index()
    return

##TODO:
#- list images / TODO: json and text files ?
image_files = list_images(args.input_imgs)

#- execute index() on every generator
#dnnmodel = DNNModel(name='googlenet',model_repo=args.models_repo + '/googlenet',nclasses=1000,extract_layer='loss3/classifier') ##TODO: config via python
#dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo)
#dnnfe.index()
print args.generators
for gen in args.generators:
    execute_generator(gen)
