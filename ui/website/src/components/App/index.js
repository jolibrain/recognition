import React from 'react';
import Header from '../Header';
import Radium from 'radium';
import styles from './styles.js';

@Radium
class App extends React.Component {
  render() {
    return <div>
      <Header/>
      {this.props.children}
    </div>;
  }
}

export default App;
