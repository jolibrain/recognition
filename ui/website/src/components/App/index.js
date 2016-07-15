import React from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import Header from '../Header';
import Radium from 'radium';
import styles from './styles.js';

@Radium
class App extends React.Component {
  render() {

    const path = this.props.location.pathname;

    console.log(path);

    return <div style={styles.body}>
      <Header/>
      <ReactCSSTransitionGroup transitionName="pageSlider" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
        {
          React.cloneElement(this.props.children,{ key: path })
        }
      </ReactCSSTransitionGroup>
    </div>;
  }
}

export default App;
