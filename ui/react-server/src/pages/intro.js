/*
   Copyright 2016 Fabrica S.P.A., Emmanuel Benazera, Alexandre Girard

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import IntroHeader from '../components/IntroHeader';
import Intro from '../components/Intro';
import '../../build/styles/header.css';
import '../../build/styles/index.css';

export default class SimplePage {
  getElements() {
    return (<div>
      <IntroHeader/>
      <Intro/>
    </div>);
  }

  getMetaTags() {
    return [
      {charset: 'utf8'},
      {'http-equiv': 'x-ua-compatible', 'content': 'ie=edge'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: 'hello world, powered by React Server'},
      {name: 'generator', content: 'React Server'},
    ];
  }

  getHeadStylesheets() {
    return [
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    ]
  }

}
