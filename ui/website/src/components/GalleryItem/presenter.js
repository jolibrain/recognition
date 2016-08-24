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
import { browserHistory } from 'react-router'

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class GalleryItem extends React.Component {

  state = {hover: false};

  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    const rx = /Z_\d+_(.*?)_/g;
    const arr = rx.exec(item.input.img);
    const itemId = arr[1];

    let classname = "row gallery_item";
    if(this.state.hover) {
      classname += " hovered";
    } else {
      classname += " not_hovered";
    }

    const inputOrientation = item.input.meta.height > item.input.meta.width ?
      "vertical" : "horizontal";

    const outputOrientation = selectedOutput.meta.height > selectedOutput.meta.width ?
      "vertical" : "horizontal";

    let author = '';
    if(item.input.meta.author) author = item.input.meta.author[0];

    return(<div>
      <div className={classname} style={styles.row}
        onMouseEnter={() => {
          this.setState({hover: true});
        }}
        onMouseLeave={() => {
          this.setState({hover: false});
        }}
        onClick={() => {
          browserHistory.push(`/gallery/${itemId}`);
        }}
      >

        <div className="col-sm-9">

          <div className="container-fluid" style={[styles.fullHeight]}>
            <div className="row" style={styles.fullHeight.row}>
              <div className="col-sm-6" style={styles.fullHeight.col}>
                <img
                  src={item.input.img}
                  style={[styles.fullHeight.img]}
                  srcSet={item.input.img.replace('reuters/', 'reuters/responsive_375/').replace("_2_", "_3_") + " 375w, " + item.input.img.replace('reuters/', 'reuters/responsive_480/').replace("_2_", "_3_") + " 480w, " + item.input.img.replace('reuters/', 'reuters/responsive_757/').replace("_2_", "_3_") + " 757w, " + item.input.img.replace('reuters/', 'reuters/responsive_1920/').replace("_2_", "_3_") + " 1920w"}
                  sizes="(min-width: 40em) 80vw, 100vw"
                />
              </div>
              <div className="col-sm-6" style={styles.fullHeight.col}>
                <img
                  style={[styles.fullHeight.img]}
                  srcSet={selectedOutput.img.replace('tate/', 'tate/responsive_375/') + " 375w, " + selectedOutput.img.replace('tate/', 'tate/responsive_480/') + " 480w, " + selectedOutput.img.replace('tate/', 'tate/responsive_757/') + " 757w"}
                  sizes="(min-width: 40em) 80vw, 100vw"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="col-sm-3" style={styles.descriptionColumn}>

          <p>No {itemId}</p>

          <p>
            {moment(item.timestamp).format('DD/MM/YYYY')}<br/>
            {moment(item.timestamp).format('hh:mm:ss')}
          </p>

            {this.state.hover ? (
            <div>
              <span key="item.input.meta.date" style={[styles.input.date, styles.hover]}>
                {moment(item.input.meta.date).format('DD/MM/YYYY')}
              </span>
              <br/>
              <span key="item.input.meta.origin" style={[styles.input.title, styles.hover]}>
                {item.input.meta.caption}</span>
              <br/>
            </div>
            ) : (
            <div>
              <span key="item.input.meta.date" style={styles.input.date}>
                {moment(item.input.meta.date).format('DD/MM/YYYY')}
              </span>
              <br/>
              <span key="item.input.meta.origin" style={styles.input.title}>
                {item.input.meta.caption}</span>
              <br/>
            </div>
            )}
            <span key="item.input.meta.origin" style={styles.input.origin}>reuters/{author}</span>

            {this.state.hover ? (
            <div>
              <span key="selectedOutput.meta.date" style={[styles.output.date, styles.hover]}>
                {selectedOutput.meta.date}
              </span>
              <br/>
              <span key="selectedOutput.meta.title" style={[styles.output.title, styles.hover]}>
                {selectedOutput.meta.title}
              </span>&nbsp;
              <span key="selectedOutput.meta.author" style={[styles.output.author, styles.hover]}>
                by {selectedOutput.meta.author}
              </span>
              <br/>
            </div>
            ) : (
            <div>
              <span key="selectedOutput.meta.date" style={styles.output.date}>
                {selectedOutput.meta.date}
              </span>
              <br/>
              <span key="selectedOutput.meta.title" style={styles.output.title}>
                {selectedOutput.meta.title}
              </span>&nbsp;
              <span key="selectedOutput.meta.author" style={styles.output.author}>
                by {selectedOutput.meta.author}
              </span>
              <br/>
            </div>
            )}
            <span style={styles.output.origin}>{selectedOutput.meta.origin}</span>

        </div>

      </div>
    </div>);
  }
}

export default GalleryItem;
