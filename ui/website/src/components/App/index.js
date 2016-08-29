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
import Header from '../Header';
import Footer from '../Footer';
import IntroOverlay from '../Intro';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import DocMeta from 'react-doc-meta';

class App extends React.Component {

  state = {
    displayIntro: true
  }

  componentWillMount() {
    const path = this.props.location.pathname;
    const segment = path.split('/')[1] || 'root';
    this.setState({displayIntro: segment == 'root'});
  }

  render() {

    const meta = [
      {name:"twitter:card", content:"summary_large_image"},
      {name:"twitter:url", content:"http://recognition.tate.org.uk/"},
      {name:"twitter:title", content:"Recognition"},
      {name:"twitter:description", content:"Recognition is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection"},
      {name:"twitter:site", content:"@Tate"},
      {name:"twitter:domain", content:"recognition.tate.org.uk"},
      {property:"og:site_name", content:"Recognition"},
      {name:"twitter:image:src", content:"http://recognition.tate.org.uk/img/default_logo.jpg"},
      {name:"twitter:image:width", content:"1200"},
      {name:"twitter:image:height", content:"628"},
      {property:"og:url", content:"http://recognition.tate.org.uk/"},
      {property:"og:title", content:"Recognition"},
      {property:"og:image", content:"http://recognition.tate.org.uk/img/default_logo.jpg"},
      {property:"og:description", content:"Recognition is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection"}
    ];

    const path = this.props.location.pathname;
    const segment = path.split('/')[1] || 'root';

    let transitionEnabled = false;
    let transitionName = '';
    if(segment === 'details') {
      transitionEnabled = true;
      transitionName = 'fade';
    } else if(segment === 'gallery' && path.split('/').length == 3) {
      transitionEnabled = true;
      transitionName = 'fade';
    }

    return <div className="appComponent">
      <DocMeta tags={meta} />
      <Header path={path}/>
      { this.state.displayIntro ? (<IntroOverlay />) : ''}
      <ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={600} transitionLeaveTimeout={600} transitionEnter={transitionEnabled} transitionLeave={transitionEnabled}>
        {
          React.cloneElement(this.props.children, { key: path })
        }
      </ReactCSSTransitionGroup>
      <Footer/>
    </div>;
  }
}

export default App;
