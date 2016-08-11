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
import moment from 'moment';
import styles from './styles.js';
import ShareModal from '../ShareModal';
import ReactInterval from 'react-interval';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Splash extends React.Component {

  state = {outputIndex: 0}

  render() {

    const match = this.props.match;

    if(match) {

      //const selectedOutput = match.output[this.state.outputIndex];
      let selectedOutput = match.output[this.state.outputIndex];

      selectedOutput.summary = {
        processing_time: Math.random() * 100000,
        scores: {
          objects: Math.random(),
          faces: Math.random(),
          composition: Math.random(),
          context: Math.random()
        }
      };

      return (<div className="splashComponent">

        <ReactInterval timeout={1000} enabled={true}
          callback={() => this.setState({
            outputIndex: this.state.outputIndex >= (this.props.match.output.length - 1) ? 0 : this.state.outputIndex + 1
          })} />

        <div className="container splashContainer" style={[styles.fullHeight]}>
          <div className="row" style={styles.fullHeight.row}>
            <div className="col-md-6" style={styles.fullHeight.col}>

              <div className="row">
                <div className="col-md-12">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Searching for match</th>
                        <th>{moment.unix(selectedOutput.summary.processing_time).format("HH:mm:ss")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><img src="/img/icons/score_objects.png"/> Objects</td>
                        <td>{(selectedOutput.summary.scores.objects * 100).toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td><img src="/img/icons/score_faces.png"/> Faces</td>
                        <td>{(selectedOutput.summary.scores.faces * 100).toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td><img src="/img/icons/score_composition.png"/> Composition</td>
                        <td>{(selectedOutput.summary.scores.composition * 100).toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td><img src="/img/icons/score_context.png"/> Context</td>
                        <td>{(selectedOutput.summary.scores.context * 100).toFixed(2)}%</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>

              <div className="row">
                <div className="col-md-12">

                  <img src={match.input.img} style={[styles.fullHeight.img]}/>

                  <p style={styles.imgDescription}>
                    {match.input.meta.date}<br/>
                    {match.input.meta.caption}<br/>
                    {match.input.meta.origin}
                  </p>

                </div>
              </div>

            </div>

            <div className="col-md-6 nopadding">

              <div className="row"  style={styles.fullHeight.row}>
                <div className="col-md-10 col-md-offset-1" style={styles.fullHeight.col}>

                  <img style={[styles.fullHeight.img]} src={selectedOutput.img} />

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
