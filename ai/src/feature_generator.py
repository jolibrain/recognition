# Generic feature generator class

import datetime,time,os,shelve
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

    ##TODO: pass input_meta and output_meta shelve dicts
    def to_json(self,results,img_reuters_repo,img_tate_repo,feature_name='',feature_description='',jdataout={},
                meta_in='',meta_out=''):
        meta_in_s = None
        meta_out_s = None
        if meta_in:
            meta_in_s = shelve.open(meta_in)
        if meta_out:
            meta_out_s = shelve.open(meta_out)
        ts = time.time()
        for img in results:
            nn = results[img]
            dataout = jdataout.get(img,None)
            if not dataout:
                metad = {}
                if meta_out:
                    metad = meta_out_s[str(os.path.basename(nn['uri']))]
                dataout = {'timestamp':datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S'),
                           'status':'none',
                           'input':{'img':img_reuters_repo + os.path.basename(nn['uri']),'meta':metad},
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
                if not 'tags_out' in nn: # turn distance into a positive / additive score
                    score = max(1.0 - score,0.0)
                if mdataout == None:
                    metad = {}
                    if meta_in:
                        metad = meta_in_s[str(os.path.basename(nuri))]
                    mdataout = {'meta':metad,'features':{'score':0,'in':{feature_name:{}},'out':{feature_name:{'description':feature_description,'score':score}}},'img':nuri_rebase}
                else:
                    mdataout['features']['out'][feature_name] = {'description':feature_description,'score':score}
                if 'tags_out' in nn:
                    if feature_name in mdataout['features']['out']:
                        mdataout['features']['out'][feature_name]['tags'] = nn['tags_out'][m]
                if 'tags_in' in nn:
                    if feature_name in mdataout['features']['in']:
                        mdataout['features']['in'][feature_name]['tags'] = nn['tags_in'][m]
                dataout['output'].append(mdataout)
                m = m + 1
            jdataout[img] = dataout
        #print jdataout
        if meta_in:
            meta_in_s.close()
        if meta_out:
            meta_out_s.close()
        return jdataout
