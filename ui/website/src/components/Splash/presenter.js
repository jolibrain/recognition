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
import Scrollchor from 'react-scrollchor';
import {Overlay} from 'react-overlays';
import {Preload} from 'react-preload';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Splash extends React.Component {

  state = {
    outputIndex: 0,
    introOverlay: false,
    hasInterval: false
  }

  render() {

    const OverlayStyle = {
    }

    const match = this.props.match;

    const imagesToLoad = match.output.map(item => item.img);

    if(match) {

      //const selectedOutput = match.output[this.state.outputIndex];
      const selectedOutput = match.output[this.state.outputIndex];

      if(this.state.introOverlay) {
        document.body.classList.toggle('noscroll', true);
        document.getElementById("app").classList.toggle('blurred', this.state.introOverlay);
      } else {
        document.body.classList.remove('noscroll');
        document.getElementById("app").classList.remove('blurred');
      }

      return (<div className="splashComponent">

        <ReactInterval timeout={1000} enabled={this.state.hasInterval}
          callback={() => this.setState({
            outputIndex: this.state.outputIndex >= (this.props.match.output.length - 1) ? 0 : this.state.outputIndex + 1
          })} />

        <Preload
          children={<div></div>}
          loadingIndicator={<div></div>}
          images={imagesToLoad}
          onSuccess={() => this.setState({hasInterval: true})}
          resolveOnError={false}
          mountChildren={false}
        />

        <Overlay
          show={this.state.introOverlay}
          onHide={() => this.setState({ introOverlay: false })}
        >
          <div className="introOverlay" style={{...OverlayStyle}}>
            <nav style={[styles.navbar, styles.gradientBackground]} className="navbar navbar-default navbar-fixed-top">
              <div className="container-fluid">

                <div className="navbar-header">
                  <p>Recognition<br/>Winner of IK Prize 2016</p>
                </div>

                <div className="collapse navbar-collapse" id="bs-navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a style={[styles.menuItem]} onClick={() => {this.setState({introOverlay: false})}}>Skip Intro</a></li>
                  </ul>
                </div>

              </div>
            </nav>
            <div className="content">
              Overlay
            </div>
          </div>
        </Overlay>

        <div className="container splashContainer" style={[styles.fullHeight]}>
          <div className="row" style={styles.fullHeight.row}>
            <div className="col-md-6" style={styles.fullHeight.col}>

              <div className="row">
                <div className="col-md-12">
                  <table className="table borderless" style={styles.table}>
                    <tbody>
                      <tr style={styles.table.header}>
                        <td  style={[styles.table.leftColumn, styles.table.headerCell]}>Searching for match</td>
                        <td style={styles.table.headerCell}>{moment.unix(selectedOutput.features.summary.processing_time).format("HH:mm:ss")}</td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.firstRowCell]}><img src="/img/icons/score_objects.png"/> Objects:</td>
                        <td style={styles.table.firstRowCell}>{(selectedOutput.features.summary.scores.objects * 100).toFixed(2)}%</td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.cell]}><img src="/img/icons/score_faces.png"/> Faces:</td>
                        <td style={styles.table.cell}>{(selectedOutput.features.summary.scores.faces * 100).toFixed(2)}%</td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.cell]}><img src="/img/icons/score_composition.png"/> Composition:</td>
                        <td style={styles.table.cell}>{(selectedOutput.features.summary.scores.composition * 100).toFixed(2)}%</td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.cell]}><img src="/img/icons/score_context.png"/> Context:</td>
                        <td style={styles.table.cell}>{(selectedOutput.features.summary.scores.context * 100).toFixed(2)}%</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>

              <div className="row">
                <div className="col-md-12" style={{textAlign: "center"}}>

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

                  <img style={[styles.fullHeight.img, {maxHeight: "75vh"}]} src={selectedOutput.img} />

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
            <Scrollchor style={styles.footer.galleryLink} to='#gallery'>
              <span className="icon--i_arrow-down" style={styles.footer.arrowDown} />
            </Scrollchor>
          </div>
        </footer>

      </div>);
    } else {
      return null;
    }
  }
}

export default Splash;
