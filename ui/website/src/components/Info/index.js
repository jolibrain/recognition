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
import GoogleTagManager from '../GoogleTagManager';

@Radium
class Info extends React.Component {
  render() {
    return <div style={styles.uppercase} className="infoPage">
      <div className="hidden-xs fluid-container">
        <div style={styles.logoRow} className="row font-subtext logoRow">
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
        <div className="row" style={{marginTop: '30px'}}>
          <div className="col-sm-4 col-sm-offset-1 font-title">
            <p><b>recognition</b> is an artificial intelligence matching British art with real-time news . Using powerful algorithms to search through Tate’s vast digital collection of British art and archive material, as well as the endless stream of news images online, recognition’s mission is to unearth hidden relationships between how the world has been represented in image form, in the past and present. Anyone will be able to watch the machine at work as it produces a stream of curated images online as a virtual exhibition. In the gallery, visitors will be able to step into an installation to explore this unique virtual collection and find out how the machine understands diverse types of images. recognition encourages us to look afresh at the art of the past through the lens of our world today.</p>
            <p>Tate has partnered with Reuters and Bing whose databases of news images recognition will continually scan in search of up-to-the-minute comparisons with works of British art in the Tate collection.</p>
          </div>
          <div className="col-sm-2 font-subtext" style={{color: '#4a4a4a'}}>
            <p><span style={{color: 'white'}}>Concept and design</span><br/>
            Coralie Gourguechon<br/>
            Angelo Semararo<br/>
            Monica Lanaro</p>
            <p><span style={{color: 'white'}}>Website design</span><br/>
            Isaac Vallentin</p>
            <p><span style={{color: 'white'}}>AI development</span><br/>
            Emmanuel Benazera</p>
            <p><span style={{color: 'white'}}>Website development</span><br/>
            Alexandre Girard</p>
          </div>
          <div className="col-sm-4">
            <p className="font-subtext infoDescription">Recognition is an autonomously operating software programme. All reasonable steps have been taken to prevent publication of challenging, offensive or infringing content. Comparisons between artistic works and other material are made by the software programme and are for the purpose of stimulating debate about art and visual representation. Tate hopes to stimulate debate around its collection and invites online discussion about these comparisons.  Tate encourages you to treat copyright material appropriately according to your local law.</p>
          </div>
        </div>
      </div>

      <div className="visible-xs fluid-container">
        <div className="row font-subtext logoRow">
          <div className="col-sm-12">
            <img className="img-responsive" src="/img/logos/tate.png"/>
          </div>
        </div>
        <div className="row font-subtext logoRow">
          <div className="col-sm-12">
            <p>In partnership with</p>
            <img className="img-responsive" src="/img/logos/microsoft.png"/>
          </div>
        </div>
        <div className="row font-subtext logoRow">
          <div className="col-sm-12">
            <p>Created by</p>
            <img className="img-responsive" src="/img/logos/fabrica.png"/>
          </div>
        </div>
        <div className="row font-subtext logoRow">
          <div className="col-sm-12">
            <p>Content providers</p>
            <div className="row">
              <div className="col-xs-6">
                <img className="img-responsive" src="/img/logos/reuters.png"/>
              </div>
              <div className="col-xs-6">
                <img className="img-responsive" src="/img/logos/bing.png"/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 font-title">
            <p><b>recognition</b> is an artificial intelligence matching British art with real-time news . Using powerful algorithms to search through Tate’s vast digital collection of British art and archive material, as well as the endless stream of news images online, recognition’s mission is to unearth hidden relationships between how the world has been represented in image form, in the past and present. Anyone will be able to watch the machine at work as it produces a stream of curated images online as a virtual exhibition. In the gallery, visitors will be able to step into an installation to explore this unique virtual collection and find out how the machine understands diverse types of images. recognition encourages us to look afresh at the art of the past through the lens of our world today.</p>
            <p>Tate has partnered with Reuters and Bing whose databases of news images recognition will continually scan in search of up-to-the-minute comparisons with works of British art in the Tate collection.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 font-subtext" style={{color: '#4a4a4a'}}>
            <p><span style={{color: 'white'}}>Concept and design</span><br/>
            Coralie Gourguechon<br/>
            Angelo Semararo<br/>
            Monica Lanaro</p>
            <p><span style={{color: 'white'}}>Website design</span><br/>
            Isaac Vallentin</p>
          </div>
          <div className="col-xs-6 font-subtext" style={{color: '#4a4a4a'}}>
            <p><span style={{color: 'white'}}>AI development</span><br/>
            Emmanuel Benazera</p>
            <p><span style={{color: 'white'}}>Website development</span><br/>
            Alexandre Girard</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p className="font-subtext infoDescription">Recognition is an autonomously operating software programme. All reasonable steps have been taken to prevent publication of challenging, offensive or infringing content. Comparisons between artistic works and other material are made by the software programme and are for the purpose of stimulating debate about art and visual representation. Tate hopes to stimulate debate around its collection and invites online discussion about these comparisons.  Tate encourages you to treat copyright material appropriately according to your local law.</p>
          </div>
        </div>
      </div>
      <GoogleTagManager dataLayerName='Info' />
    </div>;
  }
}

export default Info;
