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
import {debounce} from 'throttle-debounce';
import Swipeable from 'react-swipeable';

const steps = [
  {icon: "/img/loading/intro.png", text: (<p><em>Recognition</em> is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection</p>)},
  {icon: "/img/loading/empty.png", text: (<p><em>Recognition</em> has four different ways of looking at an image:</p>)},
  {icon: "/img/loading/object.png", text: (<p><b>Object recognition</b> is a process for identifying specific objects.  Its algorithms rely on matching, learning, or pattern recognition using appearance-based or feature-based analysis.</p>)},
  {icon: "/img/loading/face.png", text: (<p><b>Facial recognition</b> is a process for identifying human faces. In addition to locating the human faces in an image, it determines the age, gender, and emotional state of each subject it finds.</p>)},
  {icon: "/img/loading/composition.png", text: (<p><b>Composition recognition</b>is a process for identifying prominent shapes  and structures, visual layout, and colours.</p>)},
  {icon: "/img/loading/context.png", text: (<p><b>Context recognition</b> is a process which analyses the titles, dates, tags, and descriptions associated with each image. By reading this text, it's also how recognition learns how to write a caption for each match.</p>)},
  {icon: "/img/loading/empty.png", text: (<p>Images with close similarity in these four categories are selected as a match, and displayed in <em>Recognition</em>'s gallery.</p>)}
];

class IntroOverlay extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stepIndex: 0
    };

    this.scroll = debounce(200, this.scroll);
  }

  scroll(deltaY) {
    if(deltaY > 0){
      this.setState({stepIndex: this.state.stepIndex + 1});
    }
  }

  callScroll(e) {
    this.scroll(e.deltaY);
  }

  render() {

    if(this.state.stepIndex < steps.length) {
      document.body.classList.toggle('noscroll', true);
      document.getElementById("app").classList.toggle('introOverlay-app', true);
    } else {
      document.body.classList.remove('noscroll');
      document.getElementById("app").classList.remove('introOverlay-app');
      document.getElementById("splashComponent").classList.toggle('hidden', true);
    }

    if(this.state.stepIndex >= steps.length) return null;

    return (<Overlay show={this.state.stepIndex < steps.length}
                     onHide={() => this.setState({ stepIndex: 10 })}
      >
        <div className="introOverlay font-titles"
             onWheel={this.callScroll.bind(this)}        >
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">

              <div className="navbar-header">
                <p className="title"><span className="re">re]</span>[cognition<br/>
                <span className="subtitle">Winner of IK Prize 2016</span></p>
              </div>

              <ul className="nav navbar-nav navbar-right hidden-xs">
                <li><a onClick={() => {this.setState({stepIndex: 10})}} style={{letterSpacing: '1.5px'}}>Skip Intro</a></li>
              </ul>

            </div>
          </nav>

          <div className="overlayBackground hidden-xs" style={{opacity: 1.0 - this.state.stepIndex * 0.1}}/>
          <Swipeable onSwipingUp={() => this.setState({stepIndex: 10})}>
            <div className="overlayBackground visible-xs" style={{opacity: 0.5}}/>
          </Swipeable>

          <div className="container hidden-xs">
            <div className="row"><div className="col-sm-8 col-sm-offset-2 text-center">
              <img src={steps[this.state.stepIndex].icon}/>
              {steps[this.state.stepIndex].text}
            </div></div>
          </div>
          <div className="container visible-xs">
            <div className="row"><div className="col-sm-12 text-center">
              <p>an artificial intelligence matching British art with real-time news</p>
            </div></div>
          </div>

          <a className="bottom hidden-xs" onClick={() => {
            this.setState({stepIndex: this.state.stepIndex + 1});
          }}><span className="icon--i_arrow-down"/></a>
          <a className="bottom visible-xs" onClick={() => {
            this.setState({stepIndex: 10});
          }}><span className="icon--i_arrow-down"/></a>

        </div>
      </Overlay>
    );
  }
}

export default IntroOverlay;
