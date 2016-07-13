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
