# Generic feature generator class

import datetime,time,os
from index_search import Indexer, Searcher

class FeatureGenerator:

    def __init(self):
        return
        
    def preproc(self):
        return
        
    def features(self):
        return
        
    def index(self):
        return
        
    def search(self):
        return

    def to_json(self,results,img_reuters_repo,img_tate_repo,feature_name='',feature_description='',jdataout={}):
        ts = time.time()
        for img in results:
            nn = results[img]
            dataout = jdataout.get(img,None)
            if not dataout:
                dataout = {'timestamp':datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S'),
                           'status':'none',
                           'input':{'img':img_reuters_repo + os.path.basename(nn['uri']),'meta':{}},
                           'output':[]
                }
            m = 0
            for nuri in nn['nns_uris']:
                nuri_rebase = img_tate_repo + os.path.basename(nuri)
                mdataout = None
                p = 0
                for o in dataout['output']:
                    if o['img'] == nuri_rebase:
                        mdataout = o
                        del dataout['output'][p]
                        break
                    p = p + 1
                score = nn['nns'][1][m]
                if not 'tags' in nn: # turn distance into a positive / additive score
                    score = max(1.0 - score,0.0)
                if mdataout == None:
                    mdataout = {'meta':{},'features':{'score':0,'in':{},'out':{feature_name:{'description':feature_description,'score':score}}},'img':nuri_rebase}
                else:
                    mdataout['features']['out'][feature_name] = {'description':feature_description,'score':score}
                if 'tags' in nn:
                    mdataout['features']['out'][feature_name]['tags'] = nn['tags'][m]
                dataout['output'].append(mdataout)
                m = m + 1
            jdataout[img] = dataout
        #print jdataout
        return jdataout