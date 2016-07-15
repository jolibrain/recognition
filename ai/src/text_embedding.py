import os, sys, json
import word2vec
from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

import numpy as np

class TextEmbedding(FeatureGenerator):

    def __init__(self,json_files,model_repo,model_file,index_repo,tate=True):
        self.name = 'txtembed'
        self.description = 'text similarity'
        self.json_files = json_files
        self.model_file = model_file
        self.index_repo = index_repo + '/' + self.name
        try:
            os.mkdir(self.index_repo)
        except:
            pass
        self.embeddings = {} # dict of {'uri','vector'}
        self.tate = tate
        self.model_repo = model_repo
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
            else: # reuters or incoming images
                # each file usually contains data for more than a single image
                with open(jf,'r') as jfile:
                    json_data = json.load(jfile)
                    items = json_data['APIResponse']['Items']
                    for i in items:
                        caption_short = i['CaptionShort']
                        img_id = os.path.basename(i['PATH_TR3_UNWATERMARKED']['URI'])
                        #print img_id,caption_short
                        content[img_id] = caption_short.lower()
                        c =c + 1
                        
        logger.info('Processed ' + str(c) + ' JSON files')
        
        # compute embeddings
        c = 0
        for u,t in content.iteritems():
            ts = t.split(' ') #TODO: replace all punctuation ?
            vt = np.zeros(self.dim)
            for t in ts:
                try:
                    vt += self.model[t]
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
        return self.to_json(results,'img/reuters/','img/tate/',self.name,self.description,jdataout)
