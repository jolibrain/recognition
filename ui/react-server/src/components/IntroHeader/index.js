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
import {Link} from 'react-server';

export default class Intro extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <Link className="navbar-brand" to='/'><span>re]</span>[cognition</Link>
            <p>Winner of IK Prize 2016</p>
          </div>

          <div className="collapse navbar-collapse" id="bs-navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link path='/splash'>Skip Intro</Link></li>
            </ul>
          </div>

        </div>
      </nav>
    );
  }
}
