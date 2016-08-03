# metadata acquisition and indexing

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
import shelve

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class MetadataExtractor:

    def __init__(self,json_files,index_repo,tate=True):
        self.json_files = json_files
        self.index_repo = index_repo + '/metadata/'
        self.metadata = {}
        self.tate = tate
        self.s = None
        try:
            os.mkdir(self.index_repo)
        except:
            pass            

    def preproc(self):
        # acquire metadata
        c = 0
        content = {}
        for jf in self.json_files:
            if self.tate:
                ## meta -> date, title, author, origin (?), tags, description, heightxwidth, license, medium
                #print 'jf=',jf
                with open(jf,'r') as jfile:
                    meta = {}
                    json_data = json.load(jfile)
                    #print 'json_data=',json_data
                    meta['id'] = json_data['id'] # file id
                    json_data_s = json_data['source']
                    if json_data_s.get('masterImages',None) == None:
                        continue
                    limgs = len(json_data_s['masterImages'][0]['sizes'])-1
                    imgid = os.path.basename(json_data_s['masterImages'][0]['sizes'][limgs]['file'])
                    meta['height'] = json_data_s['masterImages'][0]['sizes'][limgs]['height']
                    meta['width'] = json_data_s['masterImages'][0]['sizes'][limgs]['width']
                    meta['title'] = json_data_s['title']
                    meta['medium'] = json_data_s['medium']
                    meta['date'] = json_data_s['dateText']
                    #content[img_id] = title.lower()
                    meta['author'] = []
                    for co in json_data_s['contributors']:
                        meta['author'].append(co['fc'])
                    meta['tags'] = []
                    if 'subjects' in json_data_s:
                        if isinstance(json_data_s['subjects'],list):
                            for su in json_data_s['subjects']:
                                meta['tags'].append(su['name'])
                    #if 'resources' in json_data_s and 'content' in json_data_s['resources'][0]:
                        #meta['html_content'] = json_data_s['resources'][0]['content'] # content in HTML format
                    meta['copyright'] = json_data_s['masterImages'][0]['copyright']
                    meta['creativeCommons'] = json_data_s['masterImages'][0]['creativeCommons']
                    self.metadata[imgid] = meta
                    c = c + 1
            else: # reuters or incoming images
                ## meta -> date, caption, author, heighxwidth
                # each file usually contains data for more than a single image
                with open(jf,'r') as jfile:
                    json_data = json.load(jfile)
                    try:
                        items = json_data['APIResponse']['Items']
                    except:
                        continue
                    for i in items:
                        meta = {}
                        imgid = os.path.basename(i['PATH_TR3_UNWATERMARKED']['URI'])
                        meta['caption'] = i['CaptionShort']
                        meta['height'] = i['PATH_TR3_UNWATERMARKED']['Height']
                        meta['width'] = i['PATH_TR3_UNWATERMARKED']['Width']
                        meta['date'] = i['MediaDate']
                        meta['title'] = i['Title']
                        self.metadata[imgid] = meta
                        c =c + 1
        logger.info('Processed ' + str(c) + ' JSON files')
        return

    def index(self):
        ## index in shelve dict with {img uri,metadata object}
        dbname = 'names.bin'
        if not self.tate:
            dbname = 'out_' + dbname
        self.s = shelve.open(self.index_repo + '/' + dbname)
        for m in self.metadata:
            self.s[str(m)] = self.metadata[m]
        self.s.close()
        return