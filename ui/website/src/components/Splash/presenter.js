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

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Splash extends React.Component {

  render() {

    const match = this.props.match;

    if(match) {

      const selectedOutput = match.output.filter(item => item.selected)[0];

      return (<div>

        <div className="container" style={[styles.fullHeight]}>
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
            <div className="col-md-6 nopadding">

              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <img className="img-responsive" style={styles.img} src={selectedOutput.img} />

                  <p style={styles.imgDescription}>
                    {selectedOutput.meta.date}<br/>
                    {selectedOutput.meta.title}<br/>
                    {selectedOutput.meta.origin}
                  </p>
                </div>
              </div>

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
