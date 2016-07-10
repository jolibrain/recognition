# similarity index and search

from annoy import AnnoyIndex
import shelve

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
        #print all_nns
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
            
    def load_index(self):
        self.s = shelve.open(self.db_name)
        self.t = AnnoyIndex(self.s['dim'],self.s['metric'])
        try:
            self.t.load(self.index_name)
        except:
            logger.error('failed loading index ' + self.index_name)
            return
