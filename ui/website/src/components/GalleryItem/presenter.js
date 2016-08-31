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

  state = {
    hover: false,
    processVisible: false,
    showInputOverlay: false,
    showOutputOverlay: false,
    reutersLoaded: false,
    tateLoaded: false,
    hvTop: 0,
    itemId: ''
  };

  getImagePadding(source, inputOrientation, outputOrientation) {
    if(inputOrientation == 'horizontal') {
      if(outputOrientation == 'horizontal') {
        //HH
        if(source == 'input') {
          return {paddingTop: '64px'};
        }
      } else {
        //HV
        if(source == 'input') {
          return {left: '0px', top: this.state.hvTop + 'px', position: 'absolute'};
        }
      }
    } else {
      if(outputOrientation == 'horizontal') {
        //VH
        if(source == 'output') {
          return {marginTop: '64px'};
        }
      } else {
        //VV
        if(source == 'input') {
          return {marginTop: '64px'};
        }
      }
    }
    return {};
  }

  componentWillMount() {
    if(this.props.item){
      const rx = /Z_\d+_(.*?)_/g;
      const arr = rx.exec(this.props.item.input.img);
      this.setState({itemId: arr[1]});
    }
  }

  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

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

    return(<div className="galleryItem" ref="responsiveItem">
      <div className="row visible-xs" style={styles.row}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 title">
              <p>NO. {this.state.itemId}  {moment(item.timestamp).format('DD/MM/YYYY')}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <Link to={`/image/reuters/${this.state.itemId}`}>
                <img
                  src={item.input.img.replace("_2_", "_3_")}
                  style={{width: '50vw'}}
                  srcSet={item.input.img.replace('reuters/', 'reuters/responsive_375/').replace("_2_", "_3_") + " 375w, " + item.input.img.replace('reuters/', 'reuters/responsive_480/').replace("_2_", "_3_") + " 480w, " + item.input.img.replace('reuters/', 'reuters/responsive_757/').replace("_2_", "_3_") + " 757w, " + item.input.img.replace('reuters/', 'reuters/responsive_1920/').replace("_2_", "_3_") + " 1920w"}
                  sizes="50vw"
                />
              </Link>
            </div>
            <div className="col-xs-6">
              <Link to={`/image/tate/${this.state.itemId}`}>
                <img
                  style={{width: '50vw'}}
                  src={selectedOutput.img}
                  srcSet={selectedOutput.img.replace('tate/', 'tate/responsive_375/') + " 375w, " + selectedOutput.img.replace('tate/', 'tate/responsive_480/') + " 480w"}
                  sizes="50vw"
                  onClick={() => {this.setState({showOutputOverlay: true})}}
                />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p>{moment(item.input.meta.date).format('DD/MM/YYYY')} <span className="itemSource">REUTERS/{item.input.meta.author}</span><br/>
              {item.input.meta.caption}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p>{selectedOutput.meta.date} <span className="itemSource">{selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}</span><br/><em>{selectedOutput.meta.title}</em> by {selectedOutput.meta.author}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p><a onClick={() => this.setState({processVisible: !this.state.processVisible}) } className="processClick">VIEW RECOGNITION PROCESS { this.state.processVisible ? (<span className="icon--i_arrow-down"/>) : (<span className="icon--i_arrow-right"/>)}</a></p>
              { this.state.processVisible ?
                (
                <div className="processData">
                  <p><img src="/img/icons/score_objects.svg"/> OBJECTS {(selectedOutput.features.summary.scores.objects * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.objects * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.objects * 25)).fill('.').join('')}</span></p>
                  <p><img src="/img/icons/score_faces.svg"/> FACES {(selectedOutput.features.summary.scores.faces * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.faces * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.faces * 25)).fill('.').join('')}</span></p>
                  <p><img src="/img/icons/score_composition.svg"/> COMPOSITION {(selectedOutput.features.summary.scores.composition * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.composition * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.composition * 25)).fill('.').join('')}</span></p>
                  <p><img src="/img/icons/score_context.svg"/> CONTEXT {(selectedOutput.features.summary.scores.context * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.context * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.context * 25)).fill('.').join('')}</span></p>
                </div>
                ) : '' }
            </div>
          </div>
        </div>
      </div>

      <div className={classname + " hidden-xs"} style={styles.row}
        onMouseEnter={() => {
          this.setState({hover: true});
        }}
        onMouseLeave={() => {
          this.setState({hover: false});
        }}
        onClick={() => {
          browserHistory.push(`/gallery/${this.state.itemId}`);
        }}
      >

        <div className="col-sm-6 col-sm-offset-1">

          <div className="container-fluid" style={[styles.fullHeight]}>
            <div className="row" style={styles.fullHeight.row}>
              <div className="col-sm-6" style={styles.fullHeight.col}>
                <img
                  ref='reutersImg'
                  className="img-responsive"
                  onLoad={() => {
                    this.setState({reutersLoaded: true});
                    if(this.state.tateLoaded) {
                      this.setState({hvTop: this.refs.tateImg.clientHeight - 64 - this.refs.reutersImg.clientHeight});
                    }
                  }}
                  src={item.input.img.replace("_2_", "_3_")}
                  style={[styles.fullHeight.img, this.getImagePadding('input', inputOrientation, outputOrientation)]}
                  srcSet={item.input.img.replace('reuters/', 'reuters/responsive_375/').replace("_2_", "_3_") + " 375w, " + item.input.img.replace('reuters/', 'reuters/responsive_480/').replace("_2_", "_3_") + " 480w, " + item.input.img.replace('reuters/', 'reuters/responsive_757/').replace("_2_", "_3_") + " 757w, " + item.input.img.replace('reuters/', 'reuters/responsive_1920/').replace("_2_", "_3_") + " 1920w"}
                  sizes="(min-width: 40em) 80vw, 100vw"
                />
              </div>
              <div className="col-sm-6" style={styles.fullHeight.col} ref="column">
                <img
                  ref='tateImg'
                  className="img-responsive"
                  onLoad={() => {
                    this.setState({tateLoaded: true});
                    if(this.state.reutersLoaded) {
                      this.setState({hvTop: this.refs.tateImg.clientHeight - 64 - this.refs.reutersImg.clientHeight});
                    }
                  }}
                  style={[styles.fullHeight.img, this.getImagePadding('output', inputOrientation, outputOrientation)]}
                  srcSet={selectedOutput.img.replace('tate/', 'tate/responsive_375/') + " 375w, " + selectedOutput.img.replace('tate/', 'tate/responsive_480/') + " 480w, " + selectedOutput.img.replace('tate/', 'tate/responsive_757/') + " 757w"}
                  sizes="(min-width: 40em) 80vw, 100vw"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="col-sm-3 col-sm-offset-1 font-title" style={styles.descriptionColumn}>

          <p style={{fontSize: '12px', fontFamily: 'MaisonNeue'}}>No {this.state.itemId}</p>

          <p className="timestamp font-data">
            {moment(item.timestamp).format('DD/MM/YYYY')}<br/>
            {moment(item.timestamp).format('hh:mm:ss')}
          </p>

            {this.state.hover ? (
            <div>
              <span key="item.input.meta.date" style={[styles.input.date]}>
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
            <span key="item.input.meta.origin" style={[styles.input.origin, {fontSize:'12px', fontFamily: 'MaisonNeue', textTransform: 'uppercase'}]}>reuters/{item.input.meta.author}</span>

            {this.state.hover ? (
            <div className="output-meta">
              <span key="selectedOutput.meta.date" style={[styles.output.date]}>
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
            <div className="output-meta">
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
            <span style={[{fontSize:'12px', fontFamily: 'MaisonNeue'}]} className="itemSource">{selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}</span>

        </div>

      </div>
    </div>);
  }
}

export default GalleryItem;
