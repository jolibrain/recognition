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
import ReactInterval from 'react-interval';
import Scrollchor from 'react-scrollchor';
import {Preload} from 'react-preload';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Splash extends React.Component {

  state = {
    outputIndex: 0,
    hasInterval: false
  }

  render() {

    const match = this.props.match;

    const imagesToLoad = match.output.map(item => item.img);

    if(match) {

      const selectedOutput = match.output[this.state.outputIndex];

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

        <div className="container splashContainer" style={[styles.fullHeight]}>
          <div className="row" style={styles.fullHeight.row}>
            <div className="col-xs-6" style={styles.fullHeight.col}>

              <div className="row hidden-xs">
                <div className="col-sm-12">
                  <table className="table borderless" style={styles.table}>
                    <tbody>
                      <tr style={styles.table.header}>
                        <td  style={[styles.table.leftColumn, styles.table.headerCell]}>Searching for match</td>
                        <td style={styles.table.headerCell}></td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.firstRowCell]}><img src="/img/icons/score_objects.svg"/> Objects:</td>
                        <td style={styles.table.firstRowCell}>{(selectedOutput.features.summary.scores.objects * 100).toFixed(2)}%</td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.cell]}><img src="/img/icons/score_faces.svg"/> Faces:</td>
                        <td style={styles.table.cell}>{(selectedOutput.features.summary.scores.faces * 100).toFixed(2)}%</td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.cell]}><img src="/img/icons/score_composition.svg"/> Composition:</td>
                        <td style={styles.table.cell}>{(selectedOutput.features.summary.scores.composition * 100).toFixed(2)}%</td>
                      </tr>
                      <tr style={styles.table.row}>
                        <td style={[styles.table.leftColumn, styles.table.cell]}><img src="/img/icons/score_context.svg"/> Context:</td>
                        <td style={styles.table.cell}>{(selectedOutput.features.summary.scores.context * 100).toFixed(2)}%</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>

              <div className="row">
                <div className="col-sm-12" style={{textAlign: "center", padding: 0}}>

                  <img
                    className="hidden-xs"
                    src={match.input.img}
                    style={[styles.fullHeight.img]}
                    srcSet={match.input.img.replace('reuters/', 'reuters/responsive_375/').replace("_2_", "_3_") + " 375w, " + match.input.img.replace('reuters/', 'reuters/responsive_480/').replace("_2_", "_3_") + " 480w, " + match.input.img.replace('reuters/', 'reuters/responsive_757/').replace("_2_", "_3_") + " 757w, " + match.input.img.replace('reuters/', 'reuters/responsive_1920/').replace("_2_", "_3_") + " 1920w"}
                    sizes="(min-width: 40em) 80vw, 100vw"
                  />
                  <img
                    className="visible-xs"
                    src={match.input.img}
                    style={[styles.fullHeight.img, {position:"relative", top: "20%"}]}
                    srcSet={match.input.img.replace('reuters/', 'reuters/responsive_375/').replace("_2_", "_3_") + " 375w, " + match.input.img.replace('reuters/', 'reuters/responsive_480/').replace("_2_", "_3_") + " 480w"}
                    sizes="(min-width: 40em) 80vw, 100vw"
                  />

                  <p className="hidden-xs" style={styles.imgDescription}>
                    {match.input.meta.date}<br/>
                    {match.input.meta.caption}<br/>
                    {match.input.meta.origin}
                  </p>

                </div>
              </div>

            </div>

            <div className="col-xs-6 nopadding">

              <div className="row"  style={styles.fullHeight.row}>
                <div className="col-sm-10 col-sm-offset-1" style={[styles.fullHeight.col, {padding: 0}]}>

                  <img
                    className="hidden-xs"
                    style={[styles.fullHeight.img, {maxHeight: "75vh"}]}
                    src={selectedOutput.img}
                    srcSet={selectedOutput.img.replace('tate/', 'tate/responsive_375/') + " 375w, " + selectedOutput.img.replace('tate/', 'tate/responsive_480/') + " 480w, " + selectedOutput.img.replace('tate/', 'tate/responsive_757/') + " 757w"}
                    sizes="(min-width: 40em) 80vw, 100vw"
                  />
                  <img
                    className="visible-xs"
                    style={[styles.fullHeight.img, {position:"relative", top: "20%"}]}
                    src={selectedOutput.img}
                    srcSet={selectedOutput.img.replace('tate/', 'tate/responsive_375/') + " 375w, " + selectedOutput.img.replace('tate/', 'tate/responsive_480/') + " 480w"}
                    sizes="(min-width: 40em) 80vw, 100vw"
                  />

                  <p className="hidden-xs" style={styles.imgDescription}>
                    {selectedOutput.meta.date}<br/>
                    {selectedOutput.meta.title}<br/>
                    {selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}
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
