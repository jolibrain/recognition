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
            <div className="col-md-2" style={styles.column}>
              <h2 style={styles.column.h2}>Reuters</h2>
              <ul style={styles.column.ul}>
                <li style={styles.column.ul.li}>DATE: {match.input.meta.date}</li>
                <li style={styles.column.ul.li}>TITLE: {match.input.meta.title}</li>
                <li style={styles.column.ul.li}>AUTHOR: {match.input.meta.author}</li>
              </ul>
              <img className="img-responsive" style={styles.imgTate} src={match.input.img} />
            </div>
            <div className="col-md-8">
              <h1 style={styles.mainTitle}>An artificial intelligence connecting present-day photojournalism to the fine art of the past.</h1>
            </div>
            <div className="col-md-2" style={styles.column}>
              <h2 style={styles.column.h2}>ANALYSING TATE...</h2>
              <ul style={styles.column.ul}>
                <li style={styles.column.ul.li}>DATE: {selectedOutput.meta.date}</li>
                <li style={styles.column.ul.li}>TITLE: {selectedOutput.meta.title}</li>
                <li style={styles.column.ul.li}>AUTHOR: {selectedOutput.meta.author}</li>
              </ul>
              <h3 style={styles.column.h3}>COLOR</h3>
              <ul style={styles.column.ul}>
                <li style={styles.column.ul.li}>DOMINANT COLOR: {selectedOutput.features.in.colors.dominant}</li>
                <li style={styles.column.ul.li}>ACCENT COLOR: {selectedOutput.features.in.colors.accent}</li>
              </ul>
              <h3 style={styles.column.h3}>TAGS</h3>
              <p>{selectedOutput.meta.tags}</p>
            </div>
          </div>
        </div>

        <footer className="footer" style={styles.footer}>
          <div className="container"style={styles.footer.galleryLinkContainer} >
            <Link style={styles.footer.galleryLink} to='/gallery'>
              <span className="icon--i_arrow-down" style={styles.footer.arrowDown} />
            </Link>
          </div>
        </footer>

      </div>);
    } else {
      return null;
    }
  }
}

export default Splash;
