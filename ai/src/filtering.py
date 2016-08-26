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

import shelve
import time
from copy import deepcopy

# to final format, i.e. an array instead of a dict, with filtering
def format_and_filter(dict_out,nmatches,smatches_file='',sort_best=False,website=False,no_tga=False,with_medium=False):
    json_out = []
    splash_out = {}
    lnmatches = nmatches
    if website:
        lnmatches = 1

    smatches = {}
    if smatches_file:
        smatches = shelve.open(smatches_file) # artwork / per day frequency db
    
    nowdate = time.strftime("%d-%m-%Y")
    freq_matches = {}
    if smatches_file and nowdate in smatches:
        freq_matches = smatches[nowdate]
    
    j = 0
    for k,v in dict_out.iteritems():
        c = 0
        vout = sorted(v['output'], key=lambda x: x['features']['score'],reverse=True)
        out = []
        out_splash = []
        skip = False
        for m in vout:
            if no_tga and 'TGA' in m['img']:
                continue
            if with_medium:
                medium = m['meta']['medium']
                if not medium or 'hotograph' in medium or 'lack and white' in medium or 'creenprint' in medium or 'egative' in medium:
                    continue
            img = m['img']
            if smatches_file and img in freq_matches:
                freq_matches[img] += 1
                del vout[c]
                skip = True
                break
            freq_matches[img] = 1
            if c < lnmatches:
                out.append(m)
                if website and j > 0:
                    break
            if j == 0 and website and c < nmatches:
                out_splash.append(m)
            c = c + 1
        if not skip:
            v['output'] = out
            json_out.append(v)
            if j == 0 and website:
                v_splash = deepcopy(v)
                v_splash['output'] = out_splash
                splash_out = v_splash
        j = j + 1
    if sort_best:
        json_out = sorted(json_out, key=lambda x: x['output'][0]['features']['score'],reverse=True)
    if website:
        splash_out = [splash_out]
    if smatches_file:
        smatches[nowdate] = freq_matches
        smatches.close()
    return json_out,splash_out
