# Deep Neural Network feature extractor, using DeepDetect

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

import os, sys
from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher
from dd_client import DD

import shelve

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

##TODO: may move to a tools.py 
def batch(iterable, n=1):
    l = len(iterable)
    for ndx in range(0, l, n):
        yield iterable[ndx:min(ndx + n, l)]

# class to define a dd DNN model
class DNNModel:

    def __init__(self,name,model_repo,nclasses,extract_layer='',best=5,
                 img_width=224,img_height=224,description=''):
        self.name = name
        self.description = description
        self.extract_layer = extract_layer
        self.best = best
        self.nclasses = nclasses
        self.img_width = img_width
        self.img_height = img_height
        self.model_repo = model_repo

# a feature extractor for images, from a configurable layer of a pre-trained deep neural (convolutional) net        
class DNNFeatureExtractor(FeatureGenerator):

    def __init__(self,dnnmodel,image_files,index_repo,
                 batch_size=32,dd_host='localhost',dd_port=8080,dd_description='image classification',meta_in='',meta_out='',captions_in='',captions_out=''):
        self.dd_host = dd_host
        self.dd_port = dd_port
        self.dd_description = dd_description
        self.dd_mllib = 'caffe'
        self.meta_in = meta_in
        self.meta_out = meta_out
        self.captions_in = captions_in
        self.captions_out = captions_out
        self.gpuid = 0
        self.dnnmodel = dnnmodel
        if self.dnnmodel.extract_layer:
            self.dd_mltype = 'unsupervised'
        else:
            self.dd_mltype = 'supervised'
        self.image_files = image_files
        self.batch_size = batch_size
        self.binarized = False
        self.dd = DD(self.dd_host,self.dd_port)
        self.dd.set_return_format(self.dd.RETURN_PYTHON)
        self.index_repo = index_repo + '/' + self.dnnmodel.name
        try:
            os.mkdir(self.index_repo)
        except:
            #logger.warning('directory ' + self.index_repo + ' may alreay exist')
            pass
        self.st = {} # shelve used for full tags storage
        self.stm = {} # in memory tmp storage
        if self.dd_mltype == 'supervised':
            self.st = shelve.open(self.index_repo + '/tags.bin')
        self.delete_dd_service()

    def __del__(self):
        if self.dd_mltype == 'supervised':
            for i,t in self.stm.iteritems():
                self.st[i] = t
            self.st.close()
            
    def create_dd_service(self):
        model = {'repository':self.dnnmodel.model_repo}
        parameters_input = {'connector':'image','width':self.dnnmodel.img_width,'height':self.dnnmodel.img_height}
        parameters_mllib = {'nclasses':self.dnnmodel.nclasses,'gpu':True,'gpuid':self.gpuid}
        parameters_output = {}
        screate = self.dd.put_service(self.dnnmodel.name,model,self.dd_description,self.dd_mllib,
                                      parameters_input,parameters_mllib,parameters_output,self.dd_mltype)
        outcode = screate['status']['code']
        if outcode != 201 and outcode != 403:
            logger.error('failed creation of DNN service ' + self.dnnmodel.name)
            #return
            raise Exception('failed creating DNN service ' + self.dnnmodel.name)
        return

    def delete_dd_service(self):
        self.dd.delete_service(self.dnnmodel.name,clear='')
        
    def preproc(self):
        # none needed with dd at the moment
        return

    def index(self):
        ## feature generation, to be indexed or searched for
        self.create_dd_service()
        feature_vectors = []
        uris = []
        parameters_input = {}
        parameters_mllib = {'gpu':True,'gpuid':self.gpuid,'extract_layer':self.dnnmodel.extract_layer}

        if self.dd_mltype == 'unsupervised':
            parameters_output = {'binarized':self.binarized}
            # pass one image to get the size of the output layer
            classif = self.dd.post_predict(self.dnnmodel.name,[self.image_files[0]],
                                           parameters_input,parameters_mllib,parameters_output)
            response_code = classif['status']['code']
            if response_code != 200:
                print 'response=',classif
                logger.error('failed (index) initial prediction call to model ' + self.dnnmodel.name + ' via dd')
                self.delete_dd_service()
                return
            dim = len(classif['body']['predictions']['vals'])
        else:
            parameters_output = {'best':self.dnnmodel.best}
            dim = self.dnnmodel.nclasses
            
        c = 0
        logger.info('dnn feature prediction and indexing for service ' + self.dnnmodel.name + ' with layer of size ' + str(dim))
        with Indexer(dim,self.index_repo) as indexer:
            for x in batch(self.image_files,self.batch_size):
                classif = self.dd.post_predict(self.dnnmodel.name,x,
                                               parameters_input,parameters_mllib,parameters_output)
                #print classif
                response_code = classif['status']['code']
                if response_code != 200:
                    print 'response=',classif
                    logger.error('failed (index) batch prediction call to model ' + self.dnnmodel.name + ' via dd')
                    continue
                predictions = classif['body']['predictions']
                if self.batch_size == 1 or len(self.image_files) == 1:
                    predictions = [predictions]
                for p in predictions:
                    if self.dd_mltype == 'unsupervised':
                        indexer.index_single(c,p['vals'],p['uri'])
                        if c > 0 and c % self.batch_size == 0:
                            logger.info('indexed ' + str(c) + ' images')
                    else:
                        puri = str(p['uri'])
                        indexer.index_tags_single(p['classes'],p['uri'])
                        self.stm[puri] = []
                        for pc in p['classes']:
                            self.stm[puri].append(pc['cat'])
                    c = c + 1
                            
            indexer.build_index()
            indexer.save_index()
        logger.info('indexed a total of ' + str(c) + ' images')
        self.delete_dd_service()
                    
    def search(self,jdataout={}):
        self.create_dd_service()
        parameters_input = {}
        parameters_mllib = {'gpu':True,'gpuid':self.gpuid,'extract_layer':self.dnnmodel.extract_layer}

        if self.dd_mltype == 'unsupervised':
            parameters_output = {'binarized':self.binarized}
        else:
            parameters_output = {'best':self.dnnmodel.best}

        logger.info('dnn feature prediction and searching for service ' + self.dnnmodel.name)
        results = {}
        with Searcher(self.index_repo,search_size=500) as searcher:
            searcher.load_index()
            for x in batch(self.image_files,self.batch_size):
                classif = self.dd.post_predict(self.dnnmodel.name,x,
                                               parameters_input,parameters_mllib,parameters_output)
                response_code = classif['status']['code']
                if response_code != 200:
                    print 'response=',classif
                    logger.error('failed batch (search) prediction call to model ' + self.dnnmodel.name + ' via dd')
                    self.delete_dd_service()
                    print classif
                    raise Exception('failed batch (search) prediction call to model ' + self.dnnmodel.name)
                predictions = classif['body']['predictions']
                if self.batch_size == 1 or len(self.image_files) == 1:
                    predictions = [predictions]
                #print 'predictions=',predictions
                for p in predictions:
                    if self.dd_mltype == 'unsupervised':
                        nns = searcher.search_single(p['vals'],p['uri'])
                    else:
                        puri = str(p['uri'])
                        nns = searcher.search_tags_single(p['classes'],puri)
                        nns['tags_out_all'] = []
                        for nn in nns['nns_uris']:
                            nns['tags_out_all'].append(self.st[str(nn)])
                    results[p['uri']] = nns

        self.delete_dd_service()
        return self.to_json(results,'/img/reuters/','/img/tate/',self.dnnmodel.name,self.dnnmodel.description,jdataout,self.meta_in,self.meta_out,self.captions_in,self.captions_out)
