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

import os, sys, json
import subprocess
import tempfile
from PIL import Image

from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class DenseCapExtractor(FeatureGenerator):
    
    def __init__(self,images_repo,nimages,model_repo,index_repo,densecap_dir,name,description,meta_in='',meta_out=''):
        self.name = name
        self.description = description
        self.images_repo = images_repo
        #self.nimages = nimages
        self.nimages=10
        self.meta_in = meta_in
        self.meta_out = meta_out
        self.model_repo = model_repo
        self.index_repo = index_repo + '/' + self.name
        try:
            os.mkdir(self.index_repo)
        except:
            pass
        self.densecap_dir = densecap_dir
        self.rec_per_img = {}
        self.crops = {}
        
        return

    def preproc(self):
        # get bounding boxes, captions and scores out of densecap
        dcap_tmp = tempfile.mkdtemp()
        dcap_args = ' -input_dir ' + self.images_repo + ' -output_dir ' + dcap_tmp + ' -max_images ' + str(self.nimages) + ' -output_vis_dir ' + dcap_tmp
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
        results_file = dcap_tmp + '/results.json'
        with open(results_file,'r') as jsonf:
            results_data = json.load(jsonf)
        
        j = 0
        jresults = results_data['results']
        for r in jresults:
            img_name = r['img_name']
            self.rec_per_img[img_name] = r
            img = Image.open(self.images_repo + '/' + img_name)
            img_w,img_h = img.size
            ratio_hw = img_h/float(img_w)
            ref_h = 720
            ref_w = 1.0/ratio_hw * ref_h
            bboxes = r['boxes']
            captions = r['captions']
            scores = r['scores']
            c = 0
            crops = []
            for bb in bboxes:
                if scores[c] <= 0.0:
                    del bboxes[c:]
                    del captions[c:]
                    del scores[c:]
                    self.rec_per_img[img_name]['boxes']=bboxes
                    self.rec_per_img[img_name]['captions']=captions
                    self.rec_per_img[img_name]['scores']=scores
                    self.rec_per_img[img_name]['crops']=crops
                    break
                cx = img_w * bb[0] / ref_w
                cy = img_h * bb[1] / ref_h
                cw = img_w*(bb[0]+bb[2]) / ref_w
                ch = img_h*(bb[1]+bb[3]) / ref_h
                img_crop = img.crop((int(cx),int(cy),int(cw),int(ch)))
                crops.append(img_crop)
                c = c + 1
            j = j + 1
        logger.info('Successfully preprocessing with object recognition')
        return

    def index(self):
        ##TODO: index features and data for boxes etc...
        #- iterate images and crops to get features
        #- index features

        return

    def search(self,jdataout={}):
        ##TODO
        return
