# text semantic similarity via embeddings

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

import os, json
import sys
import word2vec
import string
import unicodedata
from unidecode import unidecode
from nltk.corpus import stopwords
import xmltodict

from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

import numpy as np

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD',s)
                   if unicodedata.category(c) != 'Mn')

class TextEmbedding(FeatureGenerator):

    def __init__(self,json_files,model_repo,model_file,index_repo,tate=True,img_files=[],reuters_json=False,meta_in='',meta_out=''):
        self.name = 'txtembed'
        self.description = 'text similarity'
        self.json_files = json_files
        self.model_file = model_file
        self.index_repo = index_repo + '/' + self.name
        self.reuters_json = reuters_json
        self.meta_in = meta_in
        self.meta_out = meta_out
        try:
            os.mkdir(self.index_repo)
        except:
            pass
        self.embeddings = {} # dict of {'uri','vector'}
        self.tate = tate
        self.model_repo = model_repo
        self.img_files = img_files
        self.stopw = stopwords.words('english') # XXX: other languages, French appears to be used in some titles
        try:
            logger.info('loading w2v model')
            self.model = word2vec.load(self.model_repo + '/' + self.model_file)
            self.dim = self.model.vectors.shape[1] # embedding size
            logger.info('successfully loaded w2v model ' + self.model_repo + '/' + self.model_file + ' of dim ' + str(self.dim))
        except:
            logger.error('failed loading w2v model ' + self.model_repo + '/' + self.model_file)

    def preproc(self):
        ## parse json files and extract relevant txt data from either reuters or tate metadata
        #- Tate
        #    - in 'subjects' array: 'name' field with 'workcount' of "low" value or of level == 3 (i.e. discriminative)
        #    - 'title' field
        # - Reuters: CaptionShort and if empty, skip (for now)
        img_dict = {} # for img fast lookup, if available
        if self.img_files:
            for im in self.img_files:
                img_dict[os.path.basename(im)] = im
            
        c = 0
        content = {}
        for jf in self.json_files:
            if self.tate:
                #print 'jf=',jf
                with open(jf,'r') as jfile:
                    json_data = json.load(jfile)
                    iid = json_data['id'] # file id
                    if json_data['source'].get('masterImages',None) == None:
                        continue
                    limgs = len(json_data['source']['masterImages'][0]['sizes'])-1
                    img_id = os.path.basename(json_data['source']['masterImages'][0]['sizes'][limgs]['file'])
                    title = json_data['source']['title']
                    content[img_id] = title.lower()
                    c = c + 1
            ##TODO: reuters XML
            elif self.reuters_json: # reuters or incoming images
                # each file usually contains data for more than a single image
                with open(jf,'r') as jfile:
                    json_data = json.load(jfile)
                    items = json_data['APIResponse']['Items']
                    for i in items:
                        caption_short = i['CaptionShort']
                        img_id = os.path.basename(i['PATH_TR3_UNWATERMARKED']['URI'])
                        if img_dict and img_id not in img_dict: # if image is not available, skip it
                            continue
                        img_id = img_dict[img_id]
                        #print img_id,caption_short
                        content[img_id] = caption_short.lower()
                        c =c + 1
            else:
                with open(jf,'r') as xfile:
                    doc = xmltodict.parse(xfile.read())
                    img_loc = doc['newsMessage']['itemSet']['newsItem']['contentSet']['remoteContent']
                    l = 0
                    img_id = ''
                    for im in img_loc:
                        if '_2_' in im['rtr:altId']['#text']: # selecting mid-res image
                            img_loc = img_loc[l]
                            img_id = im['rtr:altId']['#text']
                            break
                        l = l + 1
                    if img_dict and img_id not in img_dict:
                        continue
                    img_id = img_dict[img_id]
                    caption = doc['newsMessage']['itemSet']['newsItem']['contentMeta']['headline'].lower()
                    content[img_id] = caption
                    c = c + 1

        logger.info('Processed ' + str(c) + ' files')
        
        # compute embeddings
        exclude = set(string.punctuation)
        c = 0
        for u,t in content.iteritems():
            #t = strip_accents(t) ## for now unidecode is more generic
            t = ''.join(ch for ch in t if ch not in exclude)
            ts = [unidecode(i) for i in t.split() if i not in self.stopw and len(i) > 2]
            vt = np.zeros(self.dim)
            for w in ts:
                try:
                    vt += self.model[w]
                except:
                    pass
            self.embeddings[u] = vt
            c = c + 1
        logger.info('Computed ' + str(c) + ' embedded vectors')
        return

    def index(self):
        #- iterate vector embedding and uri
        #- index vector and uri        
        logger.info('indexing text embeddings')
        c = 0
        with Indexer(self.dim,self.index_repo) as indexer:
            for u,v in self.embeddings.iteritems():
                indexer.index_single(c,v,u)
                c = c + 1
            indexer.build_index()
            indexer.save_index()
        logger.info('indexed a total of ' + str(c) + ' text embeddings')
        return

    def search(self,jdataout={}):
        results = {}
        with Searcher(self.index_repo) as searcher:
            searcher.load_index()
            for u,v in self.embeddings.iteritems():
                nns = searcher.search_single(v,u)
                results[u] = nns
        return self.to_json(results,'img/reuters/','img/tate/',self.name,self.description,jdataout,self.meta_in,self.meta_out)
