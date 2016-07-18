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

      return (<div>

        <div className="container-fluid" style={[styles.fullHeight]}>
          <div className="row">
            <div className="col-md-6">

              <h2 style={styles.h2}>Searching for match</h2>

              <ul style={styles.ul}>
              {
                selectedOutput.features.in.visual_similarity ?
                  <li style={styles.ul.li}>Visual similarity: {selectedOutput.features.in.visual_similarity.score}%</li> : ''
              }
              {
                selectedOutput.features.in.metadata_crossover ?
                  <li style={styles.ul.li}>Metadata crossover: {selectedOutput.features.in.metadata_crossover.score}%</li> : ''
              }
              {
                selectedOutput.features.in.emotional_likeness ?
                  <li style={styles.ul.li}>Emotional likeness: {selectedOutput.features.in.emotional_likeness.score}%</li> : ''
              }
              </ul>

              <p style={styles.share}>Share</p>

              <img className="img-responsive" src={match.input.img} />

              <p style={styles.imgDescription}>
                {match.input.meta.date}<br/>
                {match.input.meta.caption}<br/>
                {match.input.meta.origin}
              </p>

            </div>
            <div className="col-md-6">

              <img className="img-responsive" src={selectedOutput.img} />

              <p style={styles.imgDescription}>
                {selectedOutput.meta.date}<br/>
                {selectedOutput.meta.title}<br/>
                {selectedOutput.meta.origin}
              </p>

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
