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
        self.factors = {'composition':1.0,'places':0.5} ##TODO
        return

    # json_out in UI format, simple additive ensembling
    def ensembling(self,json_out):
        for k,m in json_out.iteritems(): # iterate matches
            for o in m['output']: # iterate candidates for a given match
                final_score = 0.0
                for g,v in o['features']['out'].iteritems(): # iterate generators of a match
                    final_score += v['score']
                o['features']['score'] = final_score
        return json_out
