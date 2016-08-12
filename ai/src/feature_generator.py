# Generic feature generator class

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
            #print 'img=',img
            nn = results[img]
            if 'uri' not in nn:
                nn['uri'] = img
            #print 'nn=',nn
            dataout = jdataout.get(img,None)
            if not dataout:
                metad = {}
                if meta_out:
                    try:
                        metad = meta_out_s[str(os.path.basename(nn['uri']))]
                    except:
                        print 'failed metad acquisition'
                        pass
                dataout = {'timestamp':datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S'),
                           'status':'none',
                           'input':{'img':img_reuters_repo + os.path.basename(nn['uri']),'meta':metad},
                           'output':[]
                }
            m = 0
            #print 'nns_uris=',nn['nns_uris']
            #print 'nn=',nn
            for nuri in nn['nns_uris']:
                #print 'nuri=',nuri
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
                if not 'tags_out' in nn and (nuri not in nn or not 'dcap_out' in nn[nuri]): # turn distance into a positive / additive score
                    score = max(1.0 - score/2.0,0.0)
                else:
                    score /= 2.0
                #print 'initial score=',nn['nns'][1][m],'final score=',score
                if mdataout == None:
                    metad = {}
                    if meta_in:
                        metad = meta_in_s.get(str(os.path.basename(nuri)),'')
                    mdataout = {'meta':metad,'features':{'score':0,'in':{feature_name:{}},'out':{feature_name:{'description':feature_description,'score':score}}},'img':nuri_rebase}
                else:
                    mdataout['features']['out'][feature_name] = {'description':feature_description,'score':score}
                    mdataout['features']['in'][feature_name] = {}
                if 'tags_out' in nn:
                    if feature_name in mdataout['features']['out']:
                        mdataout['features']['out'][feature_name]['tags'] = nn['tags_out'][m]
                if 'tags_in' in nn:
                    if feature_name in mdataout['features']['in']:
                        mdataout['features']['in'][feature_name]['tags'] = nn['tags_in'][m]
                if nuri in nn:
                    if 'dcap_in' in nn[nuri]:
                        if feature_name in mdataout['features']['in']:
                            mdataout['features']['in'][feature_name]['scores'] = nn[nuri]['dcap_in']['scores']
                            mdataout['features']['in'][feature_name]['boxes'] = nn[nuri]['dcap_in']['boxes']
                            mdataout['features']['in'][feature_name]['captions'] = nn[nuri]['dcap_in']['captions']
                    if 'dcap_out' in nn[nuri]:
                        if feature_name in mdataout['features']['out']:
                            mdataout['features']['out'][feature_name]['scores'] = nn[nuri]['dcap_out']['scores']
                            mdataout['features']['out'][feature_name]['boxes'] = nn[nuri]['dcap_out']['boxes']
                            mdataout['features']['out'][feature_name]['captions'] = nn[nuri]['dcap_out']['captions']

                    if 'mapi_in' in nn[nuri]:
                        if feature_name in mdataout['features']['in']:
                            mdataout['features']['in'][feature_name]['faceRectangles'] = nn[nuri]['mapi_in']['faceRectangles']
                            mdataout['features']['in'][feature_name]['emotions'] = nn[nuri]['mapi_in']['emotions']
                            mdataout['features']['in'][feature_name]['genders'] = nn[nuri]['mapi_in']['genders']
                            mdataout['features']['in'][feature_name]['ages'] = nn[nuri]['mapi_in']['ages']
                    if 'mapi_out' in nn[nuri]:
                        if feature_name in mdataout['features']['out']:
                            mdataout['features']['out'][feature_name]['faceRectangles'] = nn[nuri]['mapi_out']['faceRectangles']
                            mdataout['features']['out'][feature_name]['emotions'] = nn[nuri]['mapi_out']['emotions']
                            mdataout['features']['out'][feature_name]['genders'] = nn[nuri]['mapi_out']['genders']
                            mdataout['features']['out'][feature_name]['ages'] = nn[nuri]['mapi_out']['ages']

                dataout['output'].append(mdataout)
                m = m + 1
            #print 'len dataout output=',len(dataout['output'])
            if len(dataout['output']) == 0:
                continue
            jdataout[img] = dataout
        #print jdataout
        if meta_in:
            meta_in_s.close()
        if meta_out:
            meta_out_s.close()
        #print 'jdataout=',jdataout
        return jdataout
