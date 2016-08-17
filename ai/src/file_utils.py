# tools for dealing with files, mostly images

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

from os import listdir
from os.path import isfile, join
from os import walk
import glob
import sys

def list_files(repository,ext='.jpg',nfiles=-1,pattern='*'):
    onlyfiles = []
    fpattern = repository + '/' + pattern + ext
    filenames = glob.glob(fpattern)
    if nfiles > 0:
        return filenames[:nfiles]
    else:
        return filenames
    #for f in filenames:
    #nfilenames.append(f)#.replace(' ','\ '))
    #    if nfiles > 0 and len(nfilenames) >= nfiles:
    #        break
    #if nfilenames:
    #    onlyfiles.extend(nfilenames)
    #return onlyfiles
