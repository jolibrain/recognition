# Microsoft API results index & search features generator

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
import json
import numpy as np
import shelve
import hashlib
from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class MAPIGenerator(FeatureGenerator):

    def __init__(self,image_files,json_files,json_emo_files,index_repo,name,description,tate=False,meta_in='',meta_out='',captions_in='',captions_out=''):
        self.name = name
        self.description = description
        self.tate = tate
        self.meta_in = meta_in
        self.meta_out = meta_out
        self.captions_in = captions_in
        self.captions_out = captions_out
        self.image_files = image_files
        self.json_files = json_files
        self.json_emo_files = json_emo_files
        self.index_repo = index_repo + '/' + self.name
        try:
            os.mkdir(self.index_repo)
        except:
            pass
        if self.captions_in == '':
            self.captions_in = self.index_repo + '/in_captions.bin'
        if self.captions_out == '':
            self.captions_out = self.index_repo + '/out_captions.bin'

        self.mapi_dominant_colors = {}
        self.mapi_tags = {}
        self.mapi_categories = {}
        self.mapi_people = {}
        self.mapi_faces = {} # face + gender + age + emotion
        self.mapi_captions = {}

        self.stm = {}
        self.st = shelve.open(self.index_repo + '/all_tags.bin')
        self.scm = {}
        self.sc = shelve.open(self.index_repo + '/all_cats.bin')
        
        self.emotions={'anger':0,'contempt':1,'disgust':2,'fear':3,'happiness':4,'neutral':5,'sadness':6,'surprise':7}

        return

    def __del__(self):
        for i,t in self.stm.iteritems():
            self.st[i] = t
        self.st.close()
        for i,c in self.stm.iteritems():
            self.sc[i] = t
        self.sc.close()

    # fuzzy matching of rectangles since M$ API do not return the same exact face rectangles with Vision and Emotion API...
    def equal_box(self,box1,box2):
        rtol = 0.05
        if np.isclose(box1['height'],box2['height'],rtol=rtol) and np.isclose(box1['left'],box2['left'],rtol=rtol) and np.isclose(box1['top'],box2['top'],rtol=rtol) and np.isclose(box1['width'],box2['width'],rtol=rtol):
            return True
        else:
            return False
        
    def has_box(self,newbox,boxes):
        n = 0
        for b in boxes:
            if self.equal_box(newbox['faceRectangle'],b['faceRectangle']):
                return n
            n = n + 1
        return -1

    def face_vector(self,fv):
        vec = [0.0] * 10
        vec[0] = fv.get('age',-1)
        gender = -1
        g = fv.get('gender',None)
        if g:
            if g == 'Male':
                gender = 1
            else:
                gender = 2
        vec[1] = gender
        v_emos = fv.get('emotions',None)
        if v_emos:
            for e,pos in self.emotions.iteritems():
                if v_emos.get(e,None):
                    vec[2+pos] = v_emos[e]
        return vec

    def box_hash(self,box):
        m = hashlib.md5()
        for c,v in box.iteritems():
            m.update(str(v))
        ha = m.hexdigest()
        return ha

    def preproc(self):
        ## prepare fields to be indexed:
        # - dominantColors
        # - tags (no scores) -> too generic... take top 5 and attach uniform scores
        # - categories + scores -> keep scores > 0.3
        # - faces + age + gender + emotion (from emotion JSON / API) -> encode age + gender + emotion (8 categories) into vector 

        if self.tate:
            ext = '.jpg'
        else:
            ext = ''
        img_bn = ''
        for jf in self.json_files:
            with open(jf,'r') as jfile:
                json_data = json.load(jfile)
                if not img_bn:
                    jf = jf.replace('//','/')
                    img_bn = os.path.dirname(os.path.dirname(jf))
                img_name = img_bn + '/' + os.path.basename(jf).replace('_mapi.json',ext)
                if not img_name in self.image_files:
                    continue
                if json_data.get('color',None):
                    self.mapi_dominant_colors[img_name] = []
                    for c in json_data['color']['dominantColors']:
                        self.mapi_dominant_colors[img_name].append({'cat':c,'prob':0.1})
                if json_data.get('description',None):
                    self.mapi_tags[img_name] = []
                    for t in json_data['description']['tags'][:5]:
                        self.mapi_tags[img_name].append({'cat':t,'prob':0.2})
                if json_data.get('categories',None):
                    jd_cats = json_data['categories']
                    for c in jd_cats:
                        self.mapi_categories[img_name] = []
                        if c['score'] >= 0.3:
                            self.mapi_categories[img_name].append({'cat':c['name'],'prob':c['score']})
                if json_data.get('faces',None):
                    npeople = 0
                    nmales = 0
                    nfemales = 0
                    self.mapi_faces[img_name] = []
                    jd_faces = json_data['faces']
                    for jf in jd_faces:
                        self.mapi_faces[img_name].append(jf)
                        npeople += 1
                        gender = jf.get('gender',None)
                        if gender == 'Male':
                            nmales += 1
                        else:
                            nfemales += 1
                    self.mapi_people[img_name] = [npeople,nmales,nfemales]
                    #print self.mapi_people[img_name]
                if json_data.get('description',None):
                    caption = json_data['description'].get('captions',None)
                    if caption:
                        caption = caption[0]['text']
                        self.mapi_captions[img_name] = caption

                
        for jf in self.json_emo_files:
            with open(jf,'r') as jfile:
                json_data = json.load(jfile)
                img_name = img_bn + '/' + os.path.basename(jf).replace('_mapi.json','.jpg')
                if not img_name in self.image_files:
                    continue
                if len(json_data) == 0:
                    continue
                if self.mapi_faces.get(img_name,None) == None:
                    #print 'face detected with emotion API but not with Vision API...'
                    self.mapi_faces[img_name] = json_data
                    continue
                npeople = 0
                emosum = [0.0]*len(self.emotions)
                for r in json_data:
                    n = self.has_box(r,self.mapi_faces[img_name])
                    if n == -1:
                        continue
                    emo_scores = r['scores']
                    has_emo = False
                    for e,c in self.emotions.iteritems():
                        emosum[c] += emo_scores[e]
                        if emo_scores[e] > 0.5:
                            if not has_emo:
                                self.mapi_faces[img_name][n]['emotions'] = {}
                                has_emo = True
                            self.mapi_faces[img_name][n]['emotions'][e] = emo_scores[e]
                    npeople = npeople + 1
                if img_name in self.mapi_people:
                    self.mapi_people[img_name] = self.mapi_people[img_name] + emosum
                else:
                    self.mapi_people[img_name] = [npeople,0.0,0.0] + emosum
        return

    def index(self):
        ## index every variable type
        # - dominant colors (XXX: let's not match based on this, DNN does much better)
        #with Indexer(dim=1,repository=self.index_repo,db_name='colors.bin') as indexer:
        #    for c,v in self.mapi_dominant_colors.iteritems():
        #        indexer.index_tags_single(v,c)
                
        # - tags
        #print 'indexing mapi tags...'
        if self.tate:
            with Indexer(dim=1,repository=self.index_repo,db_name='tags.bin') as indexer:
                for t,v in self.mapi_tags.iteritems():
                    indexer.index_tags_single(v,t)
                    self.stm[t] = []
                    for tc in v:
                        self.stm[t].append(tc['cat'])

        # - categories
        #print 'indexing mapi categories...'
        if self.tate:
            with Indexer(dim=1,repository=self.index_repo,db_name='cats.bin') as indexer:
                for t,v in self.mapi_categories.iteritems():
                    indexer.index_tags_single(v,t)
                    self.scm[t] = []
                    for tc in v:
                        self.scm[t].append(tc['cat'])

        # - number of people and gender
        # as a vector [npeople, males, females]
        if self.tate:
            with Indexer(dim=11,repository=self.index_repo,index_name='people.ann',db_name='people.bin') as indexer:
                c = 0
                #print 'indexing', len(self.mapi_people),'people'
                for t,v in self.mapi_people.iteritems():
                    if len(v) < 11:
                        v = v + [0.0]*len(self.emotions) # if no emotion detected
                    indexer.index_single(c,v,t)
                    c = c + 1
                indexer.build_index()
                indexer.save_index()

        # - vector for age + gender + emotion + save boxes
        #print 'indexing mapi age, gender, emotion and boxes...'
        if self.tate:
            #c = 0
            with Indexer(dim=10,repository=self.index_repo) as indexer:
                ldb = shelve.open(self.index_repo + '/ldata.bin')
                for f,v in self.mapi_faces.iteritems():
                    if len(v) > 0:
                        rec = {'faceRectangles':[],'emotions':[],'genders':[],'ages':[]}
                        for fv in v:
                            vec = self.face_vector(fv)
                            indexer.index_single(c,vec,f)
                            ldb[str(c)] = (fv,f)
                            c = c + 1
                            if 'age' in fv:
                                rec['ages'].append(fv['age'])
                            if 'emotion' in fv:
                                rec['emotions'].append(fv['emotion'])
                            if 'gender' in fv:
                                rec['genders'].append(fv['gender'])
                            if 'faceRectangle' in fv:
                                rec['faceRectangles'].append(fv['faceRectangle'])
                        ldb[f] = rec
                ldb.close()
                indexer.build_index()
                indexer.save_index()
        else:
            ldb = shelve.open(self.index_repo + '/out_ldata.bin')
            for f,v in self.mapi_faces.iteritems():
                rec = {'faceRectangles':[],'emotions':[],'genders':[],'ages':[]}
                for fv in v:
                    if 'age' in fv:
                        rec['ages'].append(fv['age'])
                    if 'emotion' in fv:
                        rec['emotions'].append(fv['emotion'])
                    if 'gender' in fv:
                        rec['genders'].append(fv['gender'])
                    if 'faceRectangle' in fv:
                        rec['faceRectangles'].append(fv['faceRectangle'])
                    print 'indexing=',f,fv
                ldb[f] = rec
            ldb.close()

        # save captions
        dbname = '/out_captions.bin'
        if self.tate:
            dbname = '/in_captions.bin'
        ldb = shelve.open(self.index_repo + dbname)
        for i,c in self.mapi_captions.iteritems():
            ldb[os.path.basename(str(i))] = c.encode('utf8')
            #print 'indexing',os.path.basename(str(i)),' / ',c.encode('utf8')
        ldb.close()
        return

    def search(self,jdataout={}):
        results_tags = {}
        with Searcher(self.index_repo,search_size=1000,db_name='tags.bin') as searcher:
            searcher.load_index()
            for t,v in self.mapi_tags.iteritems():
                nns =searcher.search_tags_single(v,t)
                nns['tags_out_all'] = []
                for nn in nns['nns_uris']:
                    nns['tags_out_all'].append(self.st.get(str(nn),''))
                results_tags[t] = nns
        results_tags = self.to_json(results_tags,'/img/reuters/','/img/tate/',self.name+'_tags',self.description,jdataout,self.meta_in,self.meta_out,self.captions_in,self.captions_out,mapi_in=self.index_repo + '/ldata.bin',mapi_out=self.index_repo + '/out_ldata.bin')
        #print 'results_tags=',results_tags
       
        results_cats = {}
        with Searcher(self.index_repo,search_size=1000,db_name='cats.bin') as searcher:
            searcher.load_index()
            for t,v in self.mapi_categories.iteritems():            
                nns =searcher.search_tags_single(v,t)
                nns['tags_out_all'] = []
                for nn in nns['nns_uris']:
                    nns['tags_out_all'].append(self.sc.get(str(nn),''))
                results_cats[t] = nns
        results_tmp = self.to_json(results_cats,'/img/reuters/','/img/tate/',self.name+'_cats',self.description,results_tags,self.meta_in,self.meta_out,self.captions_in,self.captions_out,mapi_in=self.index_repo + '/ldata.bin',mapi_out=self.index_repo + '/out_ldata.bin')
        if not results_tmp:
            results_tmp = results_tags
        #print 'results_tmp=',results_tmp
        results_cats = results_tmp
        
        #results_people = {}
        #with Searcher(self.index_repo,search_size=200,index_name='people.ann',db_name='people.bin') as searcher:
        #    searcher.load_index()
        #    for f,v in self.mapi_people.iteritems():
        #        if len(v) < 11:
        #            v = v + [0.0]*8
        #        nns = searcher.search_single(v,f)
                #print 'nns=',nns
        #        results_people[f] = nns
        #print 'results_people=',results_people
        #results_tmp = self.to_json(results_people,'/img/reuters','/img/tate/',self.name+'_people',self.description,results_cats,self.meta_in,self.meta_out,self.captions_in,self.captions_out,mapi_in=self.index_repo + '/ldata.bin',mapi_out=self.index_repo + '/out_ldata.bin')
        #if not results_people:
        results_tmp = results_cats
        
        results_faces = {}
        with Searcher(self.index_repo,search_size=5000) as searcher:
            searcher.load_index()
            ldb = shelve.open(self.index_repo + '/ldata.bin')
            for f,v in self.mapi_faces.iteritems():
                resi = {} # results for this image
                for fv in v:
                    vec = self.face_vector(fv)
                    nns = searcher.search_single(vec,f)
                    m = 0
                    in_face_hash = ''
                    faceR = fv.get('faceRectangle',{})
                    if faceR:
                        in_face_hash = self.box_hash(faceR)
                    age_in = fv.get('age',-1)
                    #print 'nns scores=',nns['nns'][1]
                    for nuri in nns['nns_uris']:
                        nn = nns['nns'][0][m]
                        nndata = ldb[str(nn)]
                        nndata0 = nndata[0]
                        nndata = ldb[nuri]
                        age_out = nndata0.get('age',-1)
                        if age_in > 0 and age_out > 0 and not age_in-10<=age_out<=age_in+10:
                        #    print 'discarding based on age, age_in=',age_in,' / age_out=',age_out
                            continue
                        
                        if not nuri in resi:
                            resi[nuri] = {'mapi_out':{'faceRectangles':[],'emotions':[],'genders':[],'ages':[],'boxids':[]},
                                          'mapi_in':{'faceRectangles':[],'emotions':[],'genders':[],'ages':[],'boxids':[]},
                                          'score':0.0}
                        if in_face_hash:
                            if not faceR in resi[nuri]['mapi_in']['faceRectangles']:
                                resi[nuri]['mapi_in']['faceRectangles'].append(faceR)
                                resi[nuri]['mapi_in']['emotions'].append(fv.get('emotions',{}))
                                resi[nuri]['mapi_in']['genders'].append(fv.get('gender',-1))
                                resi[nuri]['mapi_in']['ages'].append(age_in)
                                resi[nuri]['mapi_in']['boxids'].append([in_face_hash])
                            else:
                                bidx = resi[nuri]['mapi_in']['faceRectangles'].index(faceR)
                                resi[nuri]['mapi_in']['boxids'][bidx].append(in_face_hash)

                        nnfaceR = nndata0.get('faceRectangle',{})
                        if nnfaceR:
                            if not nnfaceR in resi[nuri]['mapi_out']['faceRectangles']:
                                resi[nuri]['mapi_out']['faceRectangles'].append(nnfaceR)
                                resi[nuri]['mapi_out']['emotions'].append(nndata0.get('emotions',{}))
                                resi[nuri]['mapi_out']['genders'].append(nndata0.get('gender',-1))
                                resi[nuri]['mapi_out']['ages'].append(age_out)
                                if in_face_hash:
                                    resi[nuri]['mapi_out']['boxids'].append([in_face_hash])
                                resi[nuri]['score'] += 10.0*nns['nns'][1][m] + 0.5
                            elif in_face_hash:
                                bidx = resi[nuri]['mapi_out']['faceRectangles'].index(nnfaceR)
                                resi[nuri]['mapi_out']['boxids'][bidx].append(in_face_hash)

                        m = m + 1

                # add uri array
                nnns_uris = []
                nnns = [[],[]]
                for r in resi:
                    if r == 'nns_uris' or r == 'nns':
                        continue
                    nnns_uris.append(r)
                    nnns[0].append('') # dummy array
                    nnns[1].append(resi[r]['score'])
                    del resi[r]['score']
                resi['nns_uris'] = nnns_uris
                resi['nns'] = nnns
                results_faces[f] = resi
                
        ldb.close()
        results_faces = self.to_json(results_faces,'/img/reuters/','/img/tate/',self.name,self.description,results_tmp,self.meta_in,self.meta_out,self.captions_in,self.captions_out,mapi_in=self.index_repo + '/ldata.bin',mapi_out=self.index_repo + '/out_ldata.bin')
        if not results_faces:
            results_faces = results_tmp
        #print 'results_faces=',results_faces
        return results_faces
        
