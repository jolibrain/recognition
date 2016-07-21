# similarity index and search

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

from annoy import AnnoyIndex
import shelve
import operator

import logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Usage
# with Indexer('/path/to/repo') as indexer:
#     indexer.index(features,uris)

class Indexer:

    def __init__(self,dim,repository='',metric='angular',index_name='index.ann',db_name='names.bin',ntrees=500):
        self.metric = metric # angular or euclidean
        self.dim = dim # dimension of the indexed feature vectors
        self.repository = repository
        self.index_name = self.repository + '/' + index_name
        self.db_name = self.repository + '/' + db_name
        self.ntrees = ntrees
        self.t = AnnoyIndex(dim,metric)
        self.s = shelve.open(self.db_name)
        self.s['dim'] = self.dim
        self.s['metric'] = self.metric

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback): # to be used with the 'with Indexer(...) as indexer:' statement
        self.s.close()

    def index_single(self,c,feature_vector,uri):
        self.t.add_item(c,feature_vector)
        self.s[str(c)] = uri
        
    def index(self,feature_vectors,uris):
        c = 0
        for f in feature_vectors:
            self.t.add_item(c,f)
            self.s[str(c)] = uris[c] # uris contains the image uri and possibly more complicated structures
            c = c + 1
        self.build_index()
        self.save_index()

    def index_tags_single(self,tags,uri):
        for t in tags:
            #print t['cat'],t['prob']
            cat_key = str(t['cat'])
            if not cat_key in self.s:
                self.s[cat_key] = [{'uri':uri,'prob':t['prob']}]
            else:
                temp = self.s[cat_key]
                temp.append({'uri':uri,'prob':t['prob']})
                self.s[cat_key] = temp
        
    def build_index(self):
        logger.info('building index in ' + self.repository)
        self.t.build(self.ntrees)
            
    def save_index(self):
        logger.info('saving index into ' + self.index_name)
        self.t.save(self.index_name)

# Usage
# with Searcher('/path/to/repo') as searcher:
#       feature_nns = searcher.search(feature_vectors,uris)

class Searcher:

    def __init__(self,repository,search_size=10,index_name='index.ann',db_name='names.bin'):
        self.search_size = search_size
        self.index_name = repository + '/' + index_name
        self.db_name = repository + '/' + db_name
        self.s = None  # db
        self.t = None  # index

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.s.close()

    def search_single(self,feature_vector,uri):
        nns = self.t.get_nns_by_vector(feature_vector,self.search_size,include_distances=True)
        nns_uris = []
        for n in nns[0]:
            nns_uris.append(self.s[str(n)])
        all_nns = {'nns':nns,'nns_uris':nns_uris,'uri':uri}
        return all_nns
        
    def search(self,feature_vectors,uris):
        feature_nns = {}
        self.load_index()
        c = 0
        for f in feature_vectors:
            nns = self.u.get_nns_by_vector(f,self.search_size,include_distances=True)
            nns_uris = []
            for n in near[0]:
                nns_uris.append(self.s[str(n)])
            all_nns = {'nns':nns,'nns_uris':nns_uris,'uri':uris[c]}
            features_nns[uris[c]] = all_nns
            c = c + 1
        return feature_nns

    # tags is [{'cat':'category','prob':'probability'}]
    def search_tags_single(self,tags,uri,prob_filter=0.0):
        nns = {}
        c = 0
        for t in tags:
            if t['prob'] < prob_filter:
                continue
            rres = self.s.get(str(t['cat']),None)
            if rres:
                for res in rres:
                    if res['uri'] in nns:
                        if not t['cat'] in nns[res['uri']]['out']['tags']:
                            nns[res['uri']]['out']['tags'].append(t['cat'])
                            nns[res['uri']]['out']['score'] += res['prob']*t['prob']
                        if not t['cat'] in nns[res['uri']]['in']['tags']:
                            nns[res['uri']]['in']['tags'].append(t['cat'])
                            nns[res['uri']]['in']['score'] += res['prob']
                    else:
                        nns[res['uri']] = {'out':{'score':res['prob']*t['prob'],'tags':[t['cat']]},
                                           'in':{'score':res['prob'],'tags':[t['cat']]}}
             
        # sort uris by score and keep X first
        sorted_nns = sorted(nns.items(),key=lambda x: x[1]['out']['score'],reverse=True)
        all_nns = {'nns':[[],[]],'nns_uris':[],'tags_in':[],'tags_out':[],'uri':uri}
        c = 0
        for nn in sorted_nns:
            all_nns['nns'][1].append(nn[1]['out']['score']) # score
            all_nns['nns_uris'].append(nn[0])
            all_nns['tags_out'].append(nn[1]['out']['tags'])
            all_nns['tags_in'].append(nn[1]['in']['tags'])
            c = c + 1
            if c == self.search_size:
                break
        return all_nns
                        
        
    def load_index(self):
        self.s = shelve.open(self.db_name)
        logger.info('loading index of dim ' + str(self.s['dim']))
        self.t = AnnoyIndex(self.s['dim'],self.s['metric'])
        try:
            self.t.load(self.index_name)
        except:
            logger.error('failed loading index ' + self.index_name)
            return
