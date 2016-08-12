# DenseCap feature extractor, with bounding boxes, score and caption

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

import os, sys, json, shutil
import subprocess
import tempfile
#from PIL import Image
import h5py
import numpy as np
import shelve

from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class DenseCapExtractor(FeatureGenerator):
    
    def __init__(self,images_repo,image_files,nimages,model_repo,index_repo,densecap_dir,name,description,meta_in='',meta_out=''):
        self.name = name
        self.description = description
        self.images_repo = images_repo
        self.image_files = image_files
        self.nimages = nimages
        self.meta_in = meta_in
        self.meta_out = meta_out
        self.model_repo = model_repo
        self.index_repo = index_repo + '/' + self.name
        try:
            os.mkdir(self.index_repo)
        except:
            pass
        self.dcap_tmp = ''
        self.densecap_dir = densecap_dir
        self.rec_per_img = []
        self.dim = 4096 # from VGG densecap
        return

    def __del__(self):
        shutil.rmtree(self.dcap_tmp)

    def preproc(self):
        # get bounding boxes, captions and scores out of densecap
        self.dcap_tmp = tempfile.mkdtemp(prefix='dcap_')
        dcap_args = ' -input_images ' + ','.join(self.image_files) + ' -output_dir ' + self.dcap_tmp + ' -max_images ' + str(self.nimages) + ' -output_vis_dir ' + self.dcap_tmp + ' -boxes_per_image 10 -output_h5 1' ## XXX: custom densecap, beware that boxes_per_image > max box selected per image
        print 'dcap_args=',dcap_args
        logger.info('Detecting objects')
        pout = ''
        try:
            pout = subprocess.check_output('LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/lib64 th run_model.lua' + dcap_args, cwd=self.densecap_dir, shell=True)
        except:
            logger.error('Failed densecap call: ' + pout)
            return
        logger.info('Successfully ran object detection')
        print 'pout=',pout
        
        # read output results.json file
        results_file = self.dcap_tmp + '/results.json'
        with open(results_file,'r') as jsonf:
            results_data = json.load(jsonf)
        
        j = 0
        jresults = results_data['results']
        for r in jresults:
            img_name = r['img_name']
            self.rec_per_img.append(r)
            #img = Image.open(self.images_repo + '/' + img_name)
            #img_w,img_h = img.size
            #ratio_hw = img_h/float(img_w)
            #ref_h = 720
            #ref_w = 1.0/ratio_hw * ref_h
            bboxes = r['boxes']
            captions = r['captions']
            scores = r['scores']
            c = 0
            #crops = []
            for bb in bboxes:
                if scores[c] <= 0.0:
                    del bboxes[c:]
                    del captions[c:]
                    del scores[c:]
                    self.rec_per_img[j]['boxes']=bboxes
                    self.rec_per_img[j]['captions']=captions
                    self.rec_per_img[j]['scores']=scores
                    #self.rec_per_img[j]['crops']=crops
                    break
                #cx = img_w * bb[0] / ref_w
                #cy = img_h * bb[1] / ref_h
                #cw = img_w*(bb[0]+bb[2]) / ref_w
                #ch = img_h*(bb[1]+bb[3]) / ref_h
                #img_crop = img.crop((int(cx),int(cy),int(cw),int(ch)))
                #crops.append(img_crop)
                c = c + 1
            j = j + 1
        logger.info('Successfully preprocessed with object recognition')
        return

    def index(self):
        # index features and data for boxes etc...
        c = 0
        with h5py.File(self.dcap_tmp+'/feats.h5','r') as hf:
            #print 'h5 keys=',hf.keys()
            #npboxes = np.array(hf.get('boxes')) ## debug
            npfeats = np.array(hf.get('feats'))
            nimages = npfeats.shape[0]
            nboxes = npfeats.shape[1]
            with Indexer(self.dim,self.index_repo) as indexer:
                ldb = shelve.open(self.index_repo + '/ldata.bin')
                for i in range(0,nimages):
                    ldata = self.rec_per_img[i]
                    tnboxes = min(len(ldata['boxes']),nboxes)
                    #print 'tnboxes=',tnboxes
                    for j in range(0,tnboxes):
                        feats = npfeats[i,j]
                        #box = npboxes[i,j]
                        #print 'box=',box,' / ref box=',self.rec_per_img[i]['boxes'][j]

                        # index features
                        indexer.index_single(c,feats,self.images_repo + '/' + ldata['img_name'])
                        
                        # put rest of the data into local db
                        lbdata = {'box':ldata['boxes'][j],'caption':ldata['captions'][j],'score':ldata['scores'][j]}
                        ldb[str(c)] = lbdata          
                        c = c + 1
            ldb.close()
            indexer.build_index()
            indexer.save_index()
        return

    def search(self,jdataout={}):
        results = {}
        with h5py.File(self.dcap_tmp+'/feats.h5','r') as hf:
            npfeats = np.array(hf.get('feats'))
            nimages = npfeats.shape[0]
            nboxes = npfeats.shape[1]
            print 'nimages=',nimages
            print 'nboxes=',nboxes
            with Searcher(self.index_repo,search_size=500) as searcher:     
                ldb = shelve.open(self.index_repo + '/ldata.bin')
                searcher.load_index()
                for i in range(0,nimages):
                    resi = {} # results for this image
                    ldata = self.rec_per_img[i]
                    #print 'ldata=',ldata
                    tnboxes = min(len(ldata['boxes']),nboxes)
                    #print 'tnboxes=',tnboxes
                    for j in range(0,tnboxes):
                        feats = npfeats[i,j]
                        #print 'feats=',feats
                        nns = searcher.search_single(feats,ldata['img_name'])
                        lbdata = {'box':ldata['boxes'][j],'caption':ldata['captions'][j],'score':ldata['scores'][j]}

                        # aggregation of the results, that may correspond to different images for every box
                        m = 0
                        for nuri in nns['nns_uris']:
                            nuri = self.images_repo + '/' + nuri # add file path
                            if not nuri in resi:
                                resi[nuri] = {'dcap_out':{'boxes':[],'captions':[],'scores':[]},
                                              'dcap_in':{'boxes':[],'captions':[],'scores':[]},
                                              'score':0.0}
                            #if len(resi[nuri]['dcap_out']['boxes']) >= 10:
                                #continue # skip if two many boxes are matching -> better visualization, simpler matchings
                            if not lbdata['box'] in resi[nuri]['dcap_in']['boxes']:    
                                resi[nuri]['dcap_in']['boxes'].append(lbdata['box'])
                                resi[nuri]['dcap_in']['captions'].append(lbdata['caption'])
                                resi[nuri]['dcap_in']['scores'].append(lbdata['score'])
                            
                            nn = nns['nns'][0][m]
                            nndata = ldb[str(nn)]

                            if not nndata['box'] in resi[nuri]['dcap_out']['boxes']:
                                resi[nuri]['dcap_out']['boxes'].append(nndata['box'])
                                resi[nuri]['dcap_out']['captions'].append(nndata['caption'])
                                resi[nuri]['dcap_out']['scores'].append(nndata['score'])
                                resi[nuri]['score'] += 0.3*nns['nns'][1][m]
                            m = m + 1
                            #if m >= 5:
                            #if len(resi[nuri]) >= 5:
                                #break # limit to one uri (top) per box match

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
                    results[self.images_repo + '/' + ldata['img_name']] = resi
                    #print 'results=',results
                ldb.close()
        return self.to_json(results,'/img/reuters/','/img/tate/',self.name,self.description,jdataout,self.meta_in,self.meta_out)
