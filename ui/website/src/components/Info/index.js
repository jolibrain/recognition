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
import Radium from 'radium';
import styles from './styles.js';

@Radium
class Info extends React.Component {
  render() {
    return <div style={styles.uppercase}>
      <div className="row" style={styles.logoRow}>
        <div className="col-sm-2 col-sm-offset-1">
          <img className="img-responsive" src="/img/logos/tate.png"/>
        </div>
        <div className="col-sm-2">
          <p>In partnership with</p>
          <img className="img-responsive" src="/img/logos/microsoft.png"/>
        </div>
        <div className="col-sm-2">
          <p>Created by</p>
          <img className="img-responsive" src="/img/logos/fabrica.png"/>
        </div>
        <div className="col-sm-2">
          <p>Content providers</p>
          <div className="row">
            <div className="col-sm-6">
              <img className="img-responsive" src="/img/logos/reuters.png"/>
            </div>
            <div className="col-sm-6">
              <img className="img-responsive" src="/img/logos/bing.png"/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-1">
          <p><b>recognition</b> is an artificial intelligence matching British art with real-time news . Using powerful algorithms to search through Tate’s vast digital collection of British art and archive material, as well as the endless stream of news images online, recognition’s mission is to unearth hidden relationships between how the world has been represented in image form, in the past and present. Anyone will be able to watch the machine at work as it produces a stream of curated images online as a virtual exhibition. In the gallery, visitors will be able to step into an installation to explore this unique virtual collection and find out how the machine understands diverse types of images. recognition encourages us to look afresh at the art of the past through the lens of our world today.</p>
          <p>Tate has partnered with Reuters and Bing whose databases of news images recognition will continually scan in search of up-to-the-minute comparisons with works of British art in the Tate collection.</p>
        </div>
        <div className="col-sm-2">
          <h3>Concept and design</h3>
          <ul>
            <li>Coralie Gourguechon</li>
            <li>Angelo Semararo</li>
            <li>Monica Lanaro</li>
          </ul>
          <h3>Website design</h3>
          <ul>
            <li>Isaac Vallentin</li>
          </ul>
          <h3>AI development</h3>
          <ul>
            <li>Emmanuel Benazera</li>
          </ul>
          <h3>Website development</h3>
          <ul>
            <li>Alexandre Girard</li>
          </ul>
        </div>
        <div className="col-sm-4">
          <p>Recognition encourages us to look afresh...</p>
          <p>Recognition is autonomously...</p>
        </div>
      </div>
    </div>;
  }
}

export default Info;
