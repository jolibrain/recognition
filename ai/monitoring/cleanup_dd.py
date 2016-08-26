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

from dd_client import DD

HOST = 'localhost'
PORT = 8080

dd = DD(HOST,PORT)
dd.set_return_format(dd.RETURN_PYTHON)

def delete_dd_service(sname):
    dd.delete_service(sname,clear='')

# main
info = dd.info()

# in case there are remaining services, remove them
for s in info['head']['services']:
    sname = s['name']
    delete_dd_service(sname)

