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
import { browserHistory } from 'react-router';

@Radium
class Loading extends React.Component {

  state = {
    loadingSpeed: 10,
    percentLoading: 10,
    interval: null
  }

  componentDidMount() {
    const interval = setInterval(function() {
      if(this.state.percentLoading < 100) {
        const percentLoading = this.state.percentLoading + 1;
        this.setState({percentLoading: percentLoading});
        styles.footer.width = percentLoading + '%';
      } else {
        window.clearInterval(this.state.interval);
        browserHistory.push('/splash');
      }
    }.bind(this), this.state.loadingSpeed);
    this.setState({interval: interval});
  }

  render() {

    return (<div>
      <div className="jumbotron vertical-center">
        <div className="container">
          <h1>matching British art with real-time news</h1>
        </div>
      </div>

      <footer className="footer" style={styles.footer}>
        <div className="container-fluid">
          <p style={styles.footer.loading}>Loading <span>{this.state.percentLoading}</span>%</p>
        </div>
      </footer>

    </div>);

  }
}

export default Loading;
