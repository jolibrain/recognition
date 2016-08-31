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
                meta_in='',meta_out='',captions_in='',captions_out='',mapi_in='',mapi_out=''):
        #print 'feature_name=',feature_name,' / jdataout=',jdataout
        meta_in_s = None
        meta_out_s = None
        if meta_in:
            meta_in_s = shelve.open(meta_in)
        if meta_out:
            meta_out_s = shelve.open(meta_out)
        captions_in_s = None
        captions_out_s = None
        if captions_in:
            captions_in_s = shelve.open(captions_in)
        if captions_out:
            captions_out_s = shelve.open(captions_out)
        mapi_in_s = None
        mapi_out_s = None
        if mapi_in:
            mapi_in_s = shelve.open(mapi_in)
        if mapi_out:
            mapi_out_s = shelve.open(mapi_out)
        ts = time.time()
        for img in results:
            nn = results[img]
            if 'uri' not in nn:
                nn['uri'] = img
            #print 'nn=',nn
            #print 'img=',img
            captions_outd = ''
            mapid_out = {}
            dataout = jdataout.get(img,None)
            if not dataout:
                metad = {}
                #print 'meta_out=',meta_out
                if meta_out:
                    try:
                        metad = meta_out_s[str(os.path.basename(nn['uri']))]
                    except:
                        print 'failed metad acquisition'
                        pass
                
                dataout = {'timestamp':datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S'),
                           'status':'published', # out of published, moderated and pending
                           'input':{'img':img_reuters_repo + os.path.basename(nn['uri']),'meta':metad},
                           'output':[]
                }

            #print 'captions_out=',captions_out
            if captions_out:
                try:
                    captions_outd = captions_out_s[str(os.path.basename(nn['uri']))]
                except:
                    print 'failed captions_outd acquisition'
                    pass
                #print 'captions_outd=',captions_outd
                
                #print 'nn uri=',nn['uri']
                #print 'mapi_out=',mapi_out
            if mapi_out:
                try:
                    mapid_out = mapi_out_s[nn['uri']]
                except:
                    #print 'failed mapi_out acquisition'
                    pass

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
                    captions_ind = ''
                    if captions_in:
                        captions_ind = captions_in_s.get(str(os.path.basename(nuri)),'')
                        #if captions_ind == '':
                        #    print 'failed acquiring in caption for img=',os.path.basename(nuri)
                    mapid = {}
                    #print 'nuri=',nuri
                    #print 'mapi_in=',mapi_in
                    #print 'nuri_rebase=',nuri_rebase
                    if mapi_in:
                        mapid = mapi_in_s.get(str(nuri),{})
                    #print 'nuri=',nuri,' / mapid=',mapid

                    if feature_name != 'mapi':
                        mdataout = {'meta':metad,'features':{'score':0,'in':{feature_name:{},'mapi':mapid_out,'captions':{'caption':captions_outd}},'out':{feature_name:{'description':feature_description,'score':score},'captions':{'caption':captions_ind},'mapi':mapid}},'img':nuri_rebase}
                    else:
                        mapid['description'] = feature_description
                        mapid['score'] = score
                        mdataout = {'meta':metad,'features':{'score':0,'in':{'mapi':mapid_out,'captions':{'caption':captions_outd}},'out':{'mapi':mapid,'captions':{'caption':captions_ind}}},'img':nuri_rebase}
                else:
                    mdataout['features']['out'][feature_name] = {'description':feature_description,'score':score}
                    mdataout['features']['in'][feature_name] = {}
                if 'tags_out' in nn:
                    if feature_name in mdataout['features']['out']:
                        mdataout['features']['out'][feature_name]['tags'] = nn['tags_out'][m]
                        mdataout['features']['out'][feature_name]['all_tags'] = nn['tags_out_all'][m]
                if 'tags_in' in nn:
                    if feature_name in mdataout['features']['in']:
                        mdataout['features']['in'][feature_name]['tags'] = nn['tags_in'][m]
                        mdataout['features']['in'][feature_name]['all_tags'] = nn['tags_all_in']
                if nuri in nn:
                    if 'dcap_in' in nn[nuri]:
                        if feature_name in mdataout['features']['in']:
                            mdataout['features']['in'][feature_name]['scores'] = nn[nuri]['dcap_in']['scores']
                            mdataout['features']['in'][feature_name]['boxes'] = nn[nuri]['dcap_in']['boxes']
                            mdataout['features']['in'][feature_name]['captions'] = nn[nuri]['dcap_in']['captions']
                            mdataout['features']['in'][feature_name]['boxids'] = nn[nuri]['dcap_in']['boxids']
                    if 'dcap_out' in nn[nuri]:
                        if feature_name in mdataout['features']['out']:
                            mdataout['features']['out'][feature_name]['scores'] = nn[nuri]['dcap_out']['scores']
                            mdataout['features']['out'][feature_name]['boxes'] = nn[nuri]['dcap_out']['boxes']
                            mdataout['features']['out'][feature_name]['captions'] = nn[nuri]['dcap_out']['captions']
                            mdataout['features']['out'][feature_name]['boxids'] = nn[nuri]['dcap_out']['boxids']

                    if 'mapi_in' in nn[nuri]:
                        if feature_name in mdataout['features']['in']:
                            mdataout['features']['in'][feature_name]['faceRectangles'] = nn[nuri]['mapi_in']['faceRectangles']
                            mdataout['features']['in'][feature_name]['emotions'] = nn[nuri]['mapi_in']['emotions']
                            mdataout['features']['in'][feature_name]['genders'] = nn[nuri]['mapi_in']['genders']
                            mdataout['features']['in'][feature_name]['ages'] = nn[nuri]['mapi_in']['ages']
                            mdataout['features']['in'][feature_name]['boxids'] = nn[nuri]['mapi_in']['boxids']
                    if 'mapi_out' in nn[nuri]:
                        if feature_name in mdataout['features']['out']:
                            mdataout['features']['out'][feature_name]['faceRectangles'] = nn[nuri]['mapi_out']['faceRectangles']
                            mdataout['features']['out'][feature_name]['emotions'] = nn[nuri]['mapi_out']['emotions']
                            mdataout['features']['out'][feature_name]['genders'] = nn[nuri]['mapi_out']['genders']
                            mdataout['features']['out'][feature_name]['ages'] = nn[nuri]['mapi_out']['ages']
                            mdataout['features']['out'][feature_name]['boxids'] = nn[nuri]['mapi_out']['boxids']

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
