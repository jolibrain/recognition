# similarity search utility

"""
Copyright 2016 Fabric S.P.A, Emmanuel Benazera, Alexandre Girard

Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
"""

import sys, argparse, json
sys.path.append('../src')

import logging
logger = logging.getLogger(__name__)
from dnn_feature_extractor import DNNModel, DNNFeatureExtractor
from text_embedding import TextEmbedding
from metadata import MetadataExtractor
from densecap_extractor import DenseCapExtractor
from mapi_generator import MAPIGenerator
from caption_generator import CaptionGenerator

from file_utils import list_files
from generators import generator_lk
from ensembling import EnsemblingScores
from filtering import format_and_filter

from copy import deepcopy

parser = argparse.ArgumentParser()
parser.add_argument('--input-imgs',help='repository with images to be indexed')
parser.add_argument('--generators',help='list of comma-separated generators',nargs='+',type=str)
parser.add_argument('--indexes-repo',help='repository of indexes for generators')
parser.add_argument('--models-repo',help='repository hosting the models')
parser.add_argument('--json-output',help='JSON output file',default='match.json')
parser.add_argument('--batch-size',help='prediction batch size',type=int,default=8)
parser.add_argument('--nfiles',help='processes only the x first files',type=int,default=-1)
parser.add_argument('--nmatches',help='max final number of matches per reference image',type=int,default=20)
parser.add_argument('--sort-best',help='final ordering is best top match first',action='store_true')
parser.add_argument('--website',help='generates splash.json in addition to a version of matches without candidates',action='store_true')
parser.add_argument('--medium',help='filters out all photographs and undefined medium in art from Tate',action='store_true')
parser.add_argument('--no-tga',help='filter out images from TGA archive',action='store_true')
parser.add_argument('--last-hour',help='select images from last hour',default=-1,type=int)
parser.add_argument('--freq-filter',help='artwork daily frequency filtering database, if any',default='',type=str)
parser.add_argument('--concat',help='concat results with those of existing file',action='store_true')
args = parser.parse_args()

image_files = list_files(args.input_imgs,ext='.JPG',nfiles=args.nfiles,pattern='*_2_*',last_hour=args.last_hour)
json_files = list_files(args.input_imgs,ext='.json',nfiles=args.nfiles)
xml_files = list_files(args.input_imgs,ext='.XML',nfiles=-1,pattern='*')
json_mapi_files = json_mapi_emo_files = []
if 'mapi' in args.generators or 'all' in args.generators:
    try:
        json_mapi_files = list_files(args.input_imgs + '/mapi/',ext='.json')
        json_mapi_emo_files = list_files(args.input_imgs + '/mapi_emo/',ext='.json')
        print 'json_mapi_files=',len(json_mapi_files)
        print 'json_mapi_emo_files=',len(json_mapi_emo_files)
    except:
        pass

if len(image_files) == 0:
    print 'no new images'
    sys.exit(0)

def execute_generator(generator,jdataout={},meta_in='',meta_out='',captions_in='',captions_out='',mapi_in='',mapi_out=''):
    #print 'jdataout=',jdataout
    generator_conf = generator_lk.get(generator,None)
    if not generator_conf:
        logger.error('Unknown generator ' + generator + ', skipping')
        return
    model_repo = args.models_repo + '/' + generator_conf['name']
    if generator_conf['type'] == 'dnn':
        dnnmodel = DNNModel(name=generator,model_repo=model_repo,nclasses=generator_conf['nclasses'],extract_layer=generator_conf.get('extract_layer',''),best=generator_conf.get('best',0),description=generator_conf['description'])
        dnnfe = DNNFeatureExtractor(dnnmodel,image_files,args.indexes_repo,batch_size=generator_conf.get('batch_size',args.batch_size),meta_in=meta_in,meta_out=meta_out,captions_in=captions_in,captions_out=captions_out,mapi_in=mapi_in,mapi_out=mapi_out)
        return dnnfe.search(jdataout)
    elif generator_conf['type'] == 'w2v':
        txtembed = TextEmbedding(xml_files,model_repo=model_repo,model_file=generator_conf['file'],index_repo=args.indexes_repo,tate=False,img_files=image_files,reuters_json=False,meta_in=meta_in,meta_out=meta_out,captions_in=captions_in,captions_out=captions_out,mapi_in=mapi_in,mapi_out=mapi_out)
        txtembed.preproc()
        return txtembed.search(jdataout)
    elif generator_conf['type'] == 'densecap':
        nfiles = min(args.nfiles,len(image_files))
        dcap = DenseCapExtractor(images_repo=args.input_imgs,image_files=image_files,nimages=nfiles,model_repo=model_repo,index_repo=args.indexes_repo,name=generator,
                                 densecap_dir=generator_conf['wdir'],th_path=generator_conf['thpath'],description=generator_conf['description'],meta_in=meta_in,meta_out=meta_out,captions_in=captions_in,captions_out=captions_out,mapi_in=mapi_in,mapi_out=mapi_out)
        dcap.preproc()
        return dcap.search(jdataout)
    elif generator_conf['type'] == 'mapi' and json_mapi_files and json_mapi_emo_files:
        mapi = MAPIGenerator(image_files=image_files,json_files=json_mapi_files,json_emo_files=json_mapi_emo_files,index_repo=args.indexes_repo,name=generator,description=generator_conf['description'],tate=False,meta_in=meta_in,meta_out=meta_out,captions_in=captions_in,captions_out=captions_out)
        mapi.preproc()
        mapi.index()
        return mapi.search(jdataout)
    elif generator_conf['type'] != 'meta':
        logger.error('Unknown generator type ' + generator_conf['type'])
    return

json_out = ''

## execute metadata generator first
metad = MetadataExtractor(xml_files,index_repo=args.indexes_repo,tate=False,reuters_json=False)
metad.preproc()
metad.index()
meta_in = args.indexes_repo + '/metadata/names.bin' ##TODO: mapi captions if needed
meta_out = args.indexes_repo + '/metadata/out_names.bin'
captions_in = ''
captions_out = ''
mapi_in = ''
mapi_out = ''

generators = args.generators
if generators[0] == 'all':
    generators = generator_lk.keys()

if 'captions' in generators:
    generator_conf = generator_lk['captions']
    nfiles = min(args.nfiles,len(image_files))
    model_repo = args.models_repo + '/captions'
    captiond = CaptionGenerator(images_repo=args.input_imgs,image_files=image_files,nimages=nfiles,model_repo=model_repo,index_repo=args.indexes_repo,name='captions',nt2_dir=generator_conf['nt2_dir'],th_path=generator_conf['thpath'],description=generator_conf['description'],tate=False)
    captiond.preproc()
    captiond.index()
    captions_in = args.indexes_repo + '/captions/ldata.bin'
    captions_out = args.indexes_repo + '/captions/out_ldata.bin'
    generators.remove('captions')
mapid = {}
if 'mapi' in generators:
    mapid = execute_generator('mapi',meta_in=meta_in,meta_out=meta_out,captions_in=captions_in,captions_out=captions_out)
    mapi_in = args.indexes_repo + '/mapi/ldata.bin'
    mapi_out = args.indexes_repo + '/mapi/out_ldata.bin'
    generators.remove('mapi')
        
#sys.exit()

errors = 0
json_out = mapid
for gen in generators:
    json_out_tmp = ''
    #try:
    json_out_tmp = execute_generator(gen,jdataout=json_out,meta_in=meta_in,meta_out=meta_out,captions_in=captions_in,captions_out=captions_out,mapi_in=mapi_in,mapi_out=mapi_out)
    #except:
    #    logger.error('Failed processing with generator ' + gen)
    #    errors += 1
    #    pass
    if json_out_tmp:
        json_out = json_out_tmp
    #print 'json_out output=',json_out
es = EnsemblingScores()
json_out = es.ensembling(json_out)
smatches_file = ''
if args.freq_filter:
    smatches_file = args.freq_filter
json_out,splash_out = format_and_filter(json_out,args.nmatches,smatches_file,args.sort_best,args.website,args.no_tga,args.medium)

if args.concat:
    json_in = {}
    try:
        with open(args.json_output,'r') as fin:
            json_in = json.load(fin)
    except:
        logger.info('cannot load pre-existing JSON file=',args.json_output)
    for j in json_in:
        ##TODO: check that images are not already in
        json_out.append(j)

with open(args.json_output,'w') as fout:
    json.dump(json_out,fout)
if splash_out and splash_out != [{}]:
    with open('splash.json','w') as fout:
        json.dump(splash_out,fout)
print 'errors=',errors
sys.exit(errors)
