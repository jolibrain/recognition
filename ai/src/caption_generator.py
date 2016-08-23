# caption generator based on deep nets

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
import shelve

from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class CaptionGenerator(FeatureGenerator):

    def __init__(self,images_repo,image_files,nimages,model_repo,index_repo,nt2_dir,th_path,name,description,tate=False):
        self.name = name
        self.description = description
        self.images_repo = images_repo
        self.image_files = image_files
        self.nimages = nimages
        self.model_repo = model_repo
        self.index_repo = index_repo + '/' + self.name
        self.tate = tate
        try:
            os.mkdir(self.index_repo)
        except:
            pass
        self.nt2_dir = nt2_dir
        self.th_path = th_path
        self.batch_size = 32
        self.caption_tmp = ''
        self.nt2_vis_json = ''
        return

    def __del__(self):
        shutil.rmtree(self.caption_tmp)
        
    def preproc(self):
        # create tmp dir with symlink of images
        self.caption_tmp = tempfile.mkdtemp(prefix='caption_') + '/'
        caption_tmp_imgs = self.caption_tmp + 'imgs/'
        print 'caption_tmp_imgs=',caption_tmp_imgs
        os.mkdir(caption_tmp_imgs)
        for i in self.image_files:
            os.symlink(i,caption_tmp_imgs+os.path.basename(i))
        
        # run caption generator over Reuters and Tate images (needs to be done beforehand...) ?
        nt2_args = ' -model reuters_1M/model_id.t7 -num_images ' + str(len(self.image_files)) + ' -image_folder ' + caption_tmp_imgs + ' -batch_size ' + str(self.batch_size) + ' -dump_images 0 -gpuid 0 -dump_path 1 -output_folder ' + self.caption_tmp
        print 'nt2_args=',nt2_args
        logger.info('Generating image captions')
        pout = ''
        try:
            pout = subprocess.check_output('LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/lib64 ' + self.th_path + ' eval.lua' + nt2_args, cwd=self.nt2_dir, shell=True)
        except:
            logger.error('Failed nt2 call: ' + pout)
            return
        print 'pout=',pout
        
        ##TODO: acquire one caption per image
        with open(self.caption_tmp + 'vis.json') as visf:
            self.nt2_vis_json = json.load(visf)
        #print self.nt2_vis_json
        

        ##TODO: run rnn over top boxes ? -> need the boxes from jdataout ?
        
        
        return

    def index(self):
        dbname = '/out_ldata.bin'
        if self.tate:
            dbname = '/ldata.bin'
        ldb = shelve.open(self.index_repo + dbname)
        for j in self.nt2_vis_json:
            #print 'indexing caption -> ',os.path.basename(j['file_name']),j['caption']
            ldb[os.path.basename(os.path.basename(str(j['file_name'])))] = j['caption']
        ldb.close()
        return

    def search(self,jdataout={}):
        # captions are not used in similarity search
        return
