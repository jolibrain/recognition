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
import {Overlay} from 'react-overlays';
import { browserHistory } from 'react-router';
import ScrollListener from 'react-scroll-listener';

class IntroOverlay extends React.Component {

  state = {
    introOverlay: true,
    introStep: 0,
    scrollListener: new ScrollListener()
  }

  componentDidMount() {
    this.state.scrollListener.addScrollHandler('some-id', () => {}, () => {
      console.log('logs when no scroll-events occurred in the last 300ms(default)');
      if(this.state.introStep < 4) {
        this.setState({introStep: this.state.introStep + 1});
      } else {
        this.setState({introOverlay: false});
      }
    });
  }

  render() {

    const steps = [
      {icon: "/img/loading/intro.png", text: (<p><b>RECOGNITION</b> is an artificial intelligence<br/>comparing up-to-the-minute photojournalism<br/>with British art from the Tate collection</p>)},
      {icon: "/img/loading/object.png", text: (<p><b>RECOGNITION</b> has four different ways of looking at an image:<br/><br/><b>Object recognition</b> is a process for identifying specific objects.  Its algorithms rely on matching, learning, or pattern recognition using appearance-based or feature-based analysis.</p>)},
      {icon: "/img/loading/face.png", text: (<p><b>RECOGNITION</b> has four different ways of looking at an image:<br/><b>Facial recognition</b> is a process for identifying human faces. In addition to locating the human faces in an image, it determines the age, gender, and emotional state of each subject it finds.</p>)},
      {icon: "/img/loading/composition.png", text: (<p><b>RECOGNITION</b> has four different ways of looking at an image:<br/><br/><b>Composition recognition</b>is a process for identifying prominent shapes  and structures, visual layout, and colours.</p>)},
      {icon: "/img/loading/context.png", text: (<p><b>RECOGNITION</b> has four different ways of looking at an image:<br/><br/><b>Context recognition</b> is a process which analyses the titles, dates, tags, and descriptions associated with each image. By reading this text, it's also how recognition learns how to write a caption for each match.</p>)}
    ]

    if(this.state.introOverlay) {
      document.body.classList.toggle('noscroll', true);
      document.getElementById("app").classList.remove('introOverlay-step0', 'introOverlay-step1', 'introOverlay-step2', 'introOverlay-step3', 'introOverlay-step4');
      document.getElementById("app").classList.add('introOverlay-step' + this.state.introStep);
    } else {
      document.body.classList.remove('noscroll');
      document.getElementById("app").classList.remove('introOverlay-step0', 'introOverlay-step1', 'introOverlay-step2', 'introOverlay-step3', 'introOverlay-step4');
    }

    return (<Overlay show={this.state.introOverlay}
                     onHide={() => this.setState({ introOverlay: false })}>
        <div className="introOverlay">
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">

              <div className="navbar-header">
                <img src="/img/logos/recognition.png" alt="recognition"/>
                <p>Winner of IK Prize 2016</p>
              </div>

              <div className="collapse navbar-collapse" id="bs-navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><a onClick={() => {this.setState({introOverlay: false})}}>Skip Intro</a></li>
                </ul>
              </div>

            </div>
          </nav>
          <div className="content">
            <img src={steps[this.state.introStep].icon}/>
            {steps[this.state.introStep].text}
            <a onClick={() => {
              if(this.state.introStep < 4) {
                this.setState({introStep: this.state.introStep + 1});
              } else {
                this.setState({introOverlay: false});
              }
            }}><span className="icon--i_arrow-down"/></a>
          </div>
        </div>
      </Overlay>
    );
  }
}

export default IntroOverlay;
