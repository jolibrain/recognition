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
import { Link } from 'react-router';

function Splash() {
  return <div>
    <div id="bg">
      <img src="images/bg.jpg" alt="" />
    </div>

    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <h2>Reuters</h2>
          <hr/>
          <ul>
            <li>DATE: 06/15/16</li>
            <li>TITLE: Greco-Roman wrestling in Times Square, New York</li>
            <li>AUTHOR: Andrees Latif</li>
          </ul>
          <img src='images/dummy_splash.jpg'/>
        </div>
        <div className="col-md-8">
          <h1>An artificial intelligence connecting present-day photojournalism to the fine art of the past.</h1>
        </div>
        <div className="col-md-2">
          <h2>ANALYSING TATE...</h2>
          <hr/>
          <ul>
            <li>DATE: c1883-1888</li>
            <li>TITLE: The emigrants</li>
            <li>AUTHOR: William McTaggart</li>
          </ul>
          <h3>COLOR</h3>
          <ul>
            <li>DOMINANT COLOR: #7E7E7E</li>
            <li>ACCENT COLOR: #85773E</li>
          </ul>
          <h3>TAGS</h3>
          <p>shipwreck, painting</p>
        </div>
      </div>
    </div>

    <footer className="footer">
      <div className="container">
        <Link to='/gallery'>
          <span className="glyphicon glyphicon-menu-down" aria-hidden="true" />
        </Link>
      </div>
    </footer>

  </div>;
}

export default Splash;
