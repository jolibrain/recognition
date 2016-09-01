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
def format_and_filter(dict_out,nmatches,smatches_file='',sort_best=False,website=False,no_tga=False,with_medium=False,ev_filter=False):
    json_out = []
    gallery_out = []
    splash_out = {}
    refused = []
    lnmatches = nmatches
    if website:
        lnmatches = 1

    smatches = {}
    if smatches_file:
        smatches = shelve.open(smatches_file) # artwork / per day frequency db
    
    nowdate = time.strftime("%d-%m-%Y")
    freq_matches = {}
    freq_overall = {}
    if smatches_file and nowdate in smatches:
        freq_matches = smatches[nowdate]
        freq_overall = smatches.get('overall',{})
    
    events = {}
    j = 0
    for k,v in dict_out.iteritems():
        ev = v['input']['meta']['title'].replace(' /','/') # Reuters has bugs
        if not ev in events:
            events[ev] = []
        rimg = v['input']['img']
        event = {}
        event = {'rimg':rimg}
        c = 0
        vout = sorted(v['output'], key=lambda x: x['features']['score'],reverse=True)
        out = []
        outgal = []
        out_splash = []
        skip = False
        for m in vout:
            if no_tga and 'TGA' in m['img']:
                continue
            if with_medium:
                medium = m['meta']['medium']
                if not medium or 'hotograph' in medium or 'lack and white' in medium or 'creenprint' in medium or 'egative' in medium or 'Video' in medium:
                    continue
            img = m['img']
            if smatches_file and not img in freq_overall:
                freq_overall[img] = 0.0
            if c == 0:
                event['score'] = m['features']['score']
                event['img'] = img
                event['freqimg'] = freq_overall.get(img,0)
            if c == 0 and smatches_file and img in freq_matches:
                freq_matches[img] += 1
                freq_overall[img] += 1
                skip = True
            elif c == 0 and smatches_file:
                freq_matches[img] = 1
                freq_overall[img] = 1
            if not skip and c < lnmatches:
                out.append(m)
            if not skip and c < nmatches:
                outgal.append(m)
            if skip and c < 10:#nmatches:
                out_splash.append(m)
            if c > nmatches:
                break
            c = c + 1
        if not skip:
            v['output'] = out
            json_out.append(v)
            vgal = deepcopy(v)
            vgal['output'] = outgal
            gallery_out.append(vgal)
        elif len(refused) < 20:
            vc = deepcopy(v)
            vc['output'] = out_splash
            refused.append(vc)
        events[ev].append(event)
        j = j + 1
    splash_out = refused

    # select top match per event
    if ev_filter:
        json_out_ev = []
        for i,ev in events.items():
            cands = sorted(ev, key = lambda x: x['freqimg'])
            cands = [x for x in cands if x['freqimg'] == cands[0]['freqimg']]
            cands = sorted(cands, key = lambda x: x['score'],reverse=True)
            top_cand = cands[0]
            #print events[i]
            #print 'event=',i,' / cand0=',top_cand
    
            # filter based on events
            for j in json_out:
                if j['input']['meta']['title'] == i:
                    if j['input']['img'] == top_cand['rimg'] and j['output'][0]['img'] == top_cand['img']:
                        json_out_ev.append(j)
                        break
        json_out = json_out_ev

    if sort_best:
        json_out = sorted(json_out, key=lambda x: x['output'][0]['features']['score'],reverse=True)
    if smatches_file:
        smatches[nowdate] = freq_matches
        smatches['overall'] = freq_overall
        smatches.close()
    return json_out,gallery_out,splash_out
