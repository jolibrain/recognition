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
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import Header from '../Header';
import Radium from 'radium';
import styles from './styles.js';

@Radium
class App extends React.Component {
  render() {

    const path = this.props.location.pathname;

    return <div style={styles.body}>
      <Header path={path}/>
      <ReactCSSTransitionGroup transitionName="pageSlider" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
        {
          React.cloneElement(this.props.children,{ key: path })
        }
      </ReactCSSTransitionGroup>
    </div>;
  }
}

export default App;
