import React from 'react';
import Radium from 'radium';
import styles from './styles.js';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Splash extends React.Component {

  render() {

    const match = this.props.match;

    if(match) {
      const selectedOutput = match.output.filter(item => item.selected)[0];
      console.log(selectedOutput);

      return (<div>
        <div style={styles.bg}>
          <img src={selectedOutput.img} alt="" />
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12" style={styles.column}>
              <h2 style={styles.h2}>matching British art with real-time news</h2>
            </div>
          </div>
        </div>

        <footer className="footer" style={styles.footer}>
          <div className="container-fluid">
            <p style={styles.footer.loading}>Loading <span>{percentLoading}</span></p>
          </div>
        </footer>

      </div>);
    } else {
      return null;
    }
  }
}

export default Splash;
