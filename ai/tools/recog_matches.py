# similarity search utility

import sys, argparse
sys.path.append('../src')

import logging
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
parser.add_argument('--json-output',help='JSON output file')
args = parser.parse_args()

image_files = list_images(args.input_imgs)

def execute_generator(generator,jdataout={}):
    generator_conf = generator_lk.get(generator,None)
    if not generator_conf:
        logger.error('Unknown generator ' + generator + ', skipping')
        return
    dnnmodel = DNNModel(name=generator,model_repo=args.models_repo + '/' + generator_conf['name'],nclasses=generator_conf['nclasses'],extract_layer=generator_conf.get('extract_layer',''),best=generator_conf.get('best',0),description=generator_conf['description'])
    dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo)
    return dnnfe.search(jdataout)

#dnnmodel = DNNModel(name='googlenet',model_repo=args.models_repo + '/googlenet',nclasses=1000,extract_layer='loss3/classifier')
#dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo)
#json_out = dnnfe.search()
#print json_out

# to final format, i.e. an array instead of a dict
def format_to_array(dict_out):
    json_out = []
    for k,v in dict_out.iteritems():
        json_out.append(v)
    return json_out

json_out = ''
for gen in args.generators:
    json_out = execute_generator(gen)
print 'json_out=',format_to_array(json_out)
