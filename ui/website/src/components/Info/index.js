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
            <img style={{maxHeight: '30px', marginTop: '20px'}} className="img-responsive" src="/img/logos/microsoft.png"/>
          </div>
          <div className="col-sm-2">
            <p>Created by</p>
            <img style={{marginTop: '16px'}} className="img-responsive" src="/img/logos/fabrica.png"/>
          </div>
          <div className="col-sm-2">
            <p>Content provider</p>
            <img style={{maxHeight: '23px'}} className="img-responsive" src="/img/logos/reuters.png"/>
          </div>
        </div>
        <div className="row" style={{marginTop: '30px', paddingBottom: '64px'}}>
          <div className="col-sm-5 col-sm-offset-1 font-title infoTitle">
            <p><em>Recognition</em>, winner of <a href="http://www.tate.org.uk/ikprize" target="_blank" rel="noopener noreferrer">IK Prize</a> 2016 for digital innovation, is an artificial intelligence program that compares up-to-the-minute photojournalism with British art from the Tate collection. Over three months from 2 September to 27 November, <em>Recognition</em> will create an ever-expanding virtual gallery: a time capsule of the world represented in diverse types of images, past and present.</p>

            <p>A display at Tate Britain accompanies the online project offering visitors the chance to interrupt the machine’s selection process. The results of this experiment – to see if an artificial intelligence can learn from the many personal responses humans have when looking at images – will be presented on this site at the end of the project.</p>

            <hr/>

            <p>The software that powers <em>Recognition</em> incorporates a range of artificial intelligence technologies that simulate how humans see and understand visual images, including:</p>

            <ul><li>Object recognition</li></ul>

            <p>Developed by <a href="http://www.jolibrain.com" target="_blank" rel="noopener noreferrer">JoliBrain</a> using <a href="http://www.deepdetect.com" target="_blank" rel="noopener noreferrer">DeepDetect</a> and Densecap. A deep neural network finds objects from the image, then tries to label them by crafting a short sentence. A similarity search engine then looks for the top object matches among Tate artworks.</p>

            <ul><li>Facial recognition</li></ul>

            <p>Provided by <a href="https://www.microsoft.com/cognitive-services" target="_blank" rel="noopener noreferrer">Microsoft Cognitive Services’</a> Computer Vision and Emotion APIs.</p>

            <ul><li>Composition analysis</li></ul>

            <p>Developed by <a href="http://www.jolibrain.com" target="_blank" rel="noopener noreferrer">JoliBrain</a> using <a href="http://www.deepdetect.com" target="_blank" rel="noopener noreferrer">DeepDetect</a>. A set of deep neural networks reads the image pixels and extracts a high number of salient features. These features are then fed into a search engine that looks for the nearest per feature matches from the Tate archive.</p>

            <ul><li>Context analysis</li></ul>

            <p>Developed by <a href="http://www.jolibrain.com" target="_blank" rel="noopener noreferrer">JoliBrain</a> using <a href="http://www.deepdetect.com" target="_blank" rel="noopener noreferrer">DeepDetect</a> and word2vec. A variety of deep neural networks process both the images and their captions and tries to find inner relations, either based on location or semantic matching among words and sentences.</p>
          </div>
          <div className="col-sm-2 font-subtext" style={{color: 'white'}}>
            <p><span style={{color: '#4a4a4a'}}>Concept and design</span><br/>
            Coralie Gourguechon<br/>
            Monica Lanaro<br/>
            Angelo Semeraro</p>
            <p><span style={{color: '#4a4a4a'}}>Website design</span><br/>
            Isaac Vallentin</p>
            <p><span style={{color: '#4a4a4a'}}>AI development</span><br/>
            Emmanuel Benazera</p>
            <p><span style={{color: '#4a4a4a'}}>Website development</span><br/>
            Alexandre Girard</p>
            <p><span style={{color: '#4a4a4a'}}>Producer (TATE)</span><br/>
            Tony Guillan</p>
            <p><span style={{color: '#4a4a4a'}}>Thanks to</span><br/>
            Sam Baron<br/>Carlo Tunioli</p>
          </div>
          <div className="col-sm-3">
            <p className="font-subtext infoDescription"><em>Recognition</em> is an autonomously operating software programme. All reasonable steps have been taken to prevent publication of challenging, offensive or infringing content. Comparisons between artistic works and other material are made by the software programme and are for the purpose of stimulating debate about art, expression and representation.</p>
            <p className="font-subtext infoDescription">Tate invites online discussion about these comparisons and encourages users to treat copyright material appropriately according to their local law.</p>
            <p className="font-subtext infoDescription">If you would like to contact Tate regarding content on this site, email <a href="mailto:recognition@tate.org.uk">recognition@tate.org.uk</a></p>
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
            <img style={{maxHeight: '30px'}} className="img-responsive" src="/img/logos/microsoft.png"/>
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
            <p>Content provider</p>
            <img style={{maxHeight: '23px'}} className="img-responsive" src="/img/logos/reuters.png"/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 font-title infoTitle">
            <p><em>Recognition</em>, winner of <a href="http://www.tate.org.uk/ikprize" target="_blank" rel="noopener noreferrer">IK Prize</a> 2016 for digital innovation, is an artificial intelligence program that compares up-to-the-minute photojournalism with British art from the Tate collection. Over three months from 2 September to 27 November, <em>Recognition</em> will create an ever-expanding virtual gallery: a time capsule of the world represented in diverse types of images, past and present.</p>

            <p>A display at Tate Britain accompanies the online project offering visitors the chance to interrupt the machine’s selection process. The results of this experiment – to see if an artificial intelligence can learn from the many personal responses humans have when looking at images – will be presented on this site at the end of the project.</p>

            <hr/>

            <p>The software that powers <em>Recognition</em> incorporates a range of artificial intelligence technologies that simulate how humans see and understand visual images, including:</p>

            <ul><li>Object recognition</li></ul>

            <p>Developed by <a href="http://www.jolibrain.com" target="_blank" rel="noopener noreferrer">JoliBrain</a> using <a href="http://www.deepdetect.com" target="_blank" rel="noopener noreferrer">DeepDetect</a> and Densecap. A deep neural network finds objects from the image, then tries to label them by crafting a short sentence. A similarity search engine then looks for the top object matches among Tate artworks.</p>

            <ul><li>Facial recognition</li></ul>

            <p>Provided by <a href="https://www.microsoft.com/cognitive-services" target="_blank" rel="noopener noreferrer">Microsoft Cognitive Services’</a> Computer Vision and Emotion APIs.</p>

            <ul><li>Composition analysis</li></ul>

            <p>Developed by <a href="http://www.jolibrain.com" target="_blank" rel="noopener noreferrer">JoliBrain</a> using <a href="http://www.deepdetect.com" target="_blank" rel="noopener noreferrer">DeepDetect</a>. A set of deep neural networks reads the image pixels and extracts a high number of salient features. These features are then fed into a search engine that looks for the nearest per feature matches from the Tate archive.</p>

            <ul><li>Context analysis</li></ul>

            <p>Developed by <a href="http://www.jolibrain.com" target="_blank" rel="noopener noreferrer">JoliBrain</a> using <a href="http://www.deepdetect.com" target="_blank" rel="noopener noreferrer">DeepDetect</a> and word2vec. A variety of deep neural networks process both the images and their captions and tries to find inner relations, either based on location or semantic matching among words and sentences.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 font-subtext" style={{color: 'white'}}>
            <p><span style={{color: '#4a4a4a'}}>Concept and design</span><br/>
            Coralie Gourguechon<br/>
            Monica Lanaro<br/>
            Angelo Semeraro</p>
            <p><span style={{color: '#4a4a4a'}}>Website design</span><br/>
            Isaac Vallentin</p>
          </div>
          <div className="col-xs-6 font-subtext" style={{color: 'white'}}>
            <p><span style={{color: '#4a4a4a'}}>AI development</span><br/>
            Emmanuel Benazera</p>
            <p><span style={{color: '#4a4a4a'}}>Website development</span><br/>
            Alexandre Girard</p>
            <p><span style={{color: '#4a4a4a'}}>Producer (TATE)</span><br/>
            Tony Guillan</p>
            <p>Thanks to Sam Baron and Carlo Tunioli</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p className="font-subtext infoDescription"><em>Recognition</em> is an autonomously operating software programme. All reasonable steps have been taken to prevent publication of challenging, offensive or infringing content. Comparisons between artistic works and other material are made by the software programme and are for the purpose of stimulating debate about art, expression and representation.</p>
            <p className="font-subtext infoDescription">Tate invites online discussion about these comparisons and encourages users to treat copyright material appropriately according to their local law.</p>
            <p className="font-subtext infoDescription">If you would like to contact Tate regarding content on this site, email <a href="mailto:recognition@tate.org.uk">recognition@tate.org.uk</a></p>
          </div>
        </div>
      </div>
      <GoogleTagManager dataLayerName='Info' />
    </div>;
  }
}

export default Info;
