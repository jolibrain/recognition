# similarity index and search

from annoy import AnnoyIndex
import shelve
import operator

import logging
logger = logging.getLogger(__name__)

# Usage
# with Indexer('/path/to/repo') as indexer:
#     indexer.index(features,uris)

class Indexer:

    def __init__(self,dim,repository='',metric='angular',index_name='index.ann',db_name='names.bin',ntrees=100):
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
    def search_tags_single(self,tags,uri):
        nns = {}
        c = 0
        for t in tags:
            rres = self.s.get(str(t['cat']),None)
            ##TODO: res['prob'] would go into 'in' output structure
            if rres:
                for res in rres:
                    if res['uri'] in nns:
                        nns[res['uri']]['score'] += res['prob']*t['prob']
                        nns[res['uri']]['tags'].append(t['cat'])
                    else:
                        nns[res['uri']] = {'score':res['prob']*t['prob'],'tags':[t['cat']]} # keep max proba turned into a distance
             
        # sort uris by score and keep X first
        sorted_nns = sorted(nns.items(),key=lambda x: x[1]['score'],reverse=True)
        all_nns = {'nns':[[],[]],'nns_uris':[],'tags':[],'uri':uri}
        c = 0
        for nn in sorted_nns:
            all_nns['nns'][1].append(nn[1]['score']) # score
            all_nns['nns_uris'].append(nn[0])
            all_nns['tags'].append(nn[1]['tags'])
            c = c + 1
            if c == self.search_size:
                break
        return all_nns
                        
        
    def load_index(self):
        self.s = shelve.open(self.db_name)
        self.t = AnnoyIndex(self.s['dim'],self.s['metric'])
        try:
            self.t.load(self.index_name)
        except:
            logger.error('failed loading index ' + self.index_name)
            return
