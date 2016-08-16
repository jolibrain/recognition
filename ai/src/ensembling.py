# Simple ensembling of similarity scores

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

class EnsemblingScores:
    def __init__(self):
        self.factors = {'composition':0.3,'places_composition':0.3,'places':0.2,'categories':0.1,'densecap':0.5,'mapi_tags':0.1,'mapi_cats':0.1,'mapi':0.05,'txtembed':0.3}
        self.summary_map = {'composition':'composition','places_composition':'composition','places':'context','categories':'context','densecap':'objects','mapi_cats':'context','mapi_tags':'context','mapi':'faces','txtembed':'context'}
        return

    # json_out in UI format, simple additive ensembling
    def ensembling(self,json_out):
        for k,m in json_out.iteritems(): # iterate matches
            for o in m['output']: # iterate candidates for a given match
                summary = {'scores':{'objects':0.0,'faces':0.0,'composition':0.0,'context':0.0},
                           'processing_time':0.0}
                summary_sum = 0.0
                final_score = 0.0
                comp_score = 0.0 # compositional score
                comp_num = 0.0
                for g,v in o['features']['out'].iteritems(): # iterate generators of a match
                    factor = 1.0
                    for fa,fv in self.factors.iteritems():
                        if fa in g:
                            factor = fv
                            break
                    if 'composition' in g:
                        comp_num += 1.0
                        comp_score += factor*v['score']#(1.0/comp_num) * factor*v['score']
                        summary['scores'][self.summary_map['composition']] += 1.0
                    elif 'categories' in g:
                        summary['scores'][self.summary_map['categories']] += 1.0
                    else:
                        final_score += factor*v['score']
                        summary['scores'][self.summary_map[g]] += 1.0
                    summary_sum += 1.0
                if comp_num > 0.0:
                    final_score += comp_score / comp_num
                o['features']['score'] = final_score
                for s,sv in summary['scores'].iteritems():
                    sv /= summary_sum
                    summary['scores'][s] = sv
                o['features']['summary'] = summary
        return json_out
