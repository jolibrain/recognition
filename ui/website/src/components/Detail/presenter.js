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
import DetailFeatures from './presenter_features'
import BoundedImage from './BoundedImage'
import GoogleTagManager from '../GoogleTagManager';
import DocMeta from 'react-doc-meta';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Detail extends React.Component {

  state = {
    overImg: false,
    overTags: false,
    overLeft: {hash: []},
    overRight: {hash: []},
    showOutputOverlay: false
  };

  handleOverTags(parent, over) {
    parent.setState({overTags: over});
  }

  handleLeftOverFeatures(parent, overHash) {
    parent.setState({
      overLeft: {hash: overHash},
      overRight: {hash: overHash},
    });
  }

  handleRightOverFeatures(parent, overHash, overIndex) {
    parent.setState({
      overLeft: {hash: [], index: overIndex},
      overRight: {hash: overHash, index: overIndex}
    });
  }

  handleLeftOverFace(parent, overHash) {
    parent.setState({
      overLeft: {hash: overHash},
      overRight: {hash: overHash}
    });
  }

  handleRightOverFace(parent, overHash) {
    parent.setState({
      overLeft: {hash: overHash},
      overRight: {hash: overHash},
    });
  }

  handleLeftOverCanvas(parent, overHash, overIndex, overImg) {
    parent.setState({
      overImg: overImg,
      overLeft: {hash: overHash},
      overRight: {hash: overHash},
    });
  }

  handleRightOverCanvas(parent, overHash, overIndex, overImg) {
    parent.setState({
      overImg: overImg,
      overLeft: {hash: [], index: overIndex},
      overRight: {hash: overHash}
    });
  }

  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    const rx = /Z_\d+_(.*?)_/g;
    const arr = rx.exec(item.input.img);
    const itemId = arr[1];

    const meta = [
      {name:"twitter:card", content:"summary_large_image"},
      {name:"twitter:url", content:"http://recognition.tate.org.uk/"},
      {name:"twitter:title", content:"Recognition"},
      {name:"twitter:description", content:"Recognition is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection"},
      {name:"twitter:site", content:"@Tate"},
      {name:"twitter:domain", content:"recognition.tate.org.uk"},
      {property:"og:site_name", content:"Recognition"},
      {name:"twitter:image:src", content:`http://recognition.tate.org.uk/img/og_image/${itemId}`},
      {name:"twitter:image:width", content:"1200"},
      {name:"twitter:image:height", content:"628"},
      {property:"og:url", content:"http://recognition.tate.org.uk/"},
      {property:"og:title", content:"Recognition"},
      {property:"og:description", content:"Recognition is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection"},
      {property: 'og:image', content: `http://recognition.tate.org.uk/img/og_image/${itemId}.jpg`}
    ];

    return(<div>
      <div className="visible-xs galleryItem">
        <div className="container-fluid" style={{fontSize: '13px', letterSpacing: '1.5px'}}>
          <div className="row" style={{paddingBottom: '16px'}}>
            <div className="col-xs-12 title">
              <Link to="/gallery" style={{fontFamily: 'TateNewPro', fontSize:'13px', letterSpacing: '1.5px', color: '#fff', textDecoration: 'none', textTransform: 'uppercase'}}><span className='icon--i_arrow-left'/> Back to gallery</Link>
            </div>
          </div>
          <div className="row" style={{paddingBottom: '16px'}}>
            <div className="col-xs-12 title">
              <p style={{fontSize: '13px', letterSpacing: '1.5px'}}>NO. {itemId}  {moment(item.timestamp).format('DD/MM/YYYY')}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6" style={{paddingRight: 0}}>
              <Link to={`/image/reuters/${itemId}`}>
                <img
                  className="img-responsive"
                  src={item.input.img.replace("_2_", "_3_")}
                  srcSet={item.input.img.replace('reuters/', 'reuters/responsive_375/').replace("_2_", "_3_") + " 375w, " + item.input.img.replace('reuters/', 'reuters/responsive_480/').replace("_2_", "_3_") + " 480w, " + item.input.img.replace('reuters/', 'reuters/responsive_757/').replace("_2_", "_3_") + " 757w, " + item.input.img.replace('reuters/', 'reuters/responsive_1920/').replace("_2_", "_3_") + " 1920w"}
                />
              </Link>
            </div>
            <div className="col-xs-6">
              <Link to={`/image/tate/${itemId}`}>
                <img
                  className="img-responsive"
                  src={selectedOutput.img}
                  srcSet={selectedOutput.img.replace('tate/', 'tate/responsive_375/') + " 375w, " + selectedOutput.img.replace('tate/', 'tate/responsive_480/') + " 480w"}
                  onClick={() => {this.setState({showOutputOverlay: true})}}
                />
              </Link>
            </div>
          </div>
          <div className="row" style={{paddingTop: '32px'}}>
            <div className="col-xs-12">
              <p>{moment(item.input.meta.date).format('DD/MM/YYYY')} <span className="itemSource">REUTERS/{item.input.meta.author}</span><br/>
              <span style={{fontSize: '18px', letterSpacing: 0}}>{item.input.meta.caption}</span></p>
            </div>
          </div>
          <div className="row" style={{paddingTop: '16px'}}>
            <div className="col-xs-12">
              <p>{selectedOutput.meta.date} <span className="itemSource">{selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}</span><br/><span style={{fontSize: '18px', letterSpacing: 0}}><em>{selectedOutput.meta.title}</em> by {selectedOutput.meta.author}</span></p>
            </div>
          </div>
          <div className="row" style={{paddingTop: '16px'}}>
            <div className="col-xs-12">
              <p><a onClick={() => this.setState({processVisible: !this.state.processVisible}) } className="processClick">VIEW RECOGNITION PROCESS { this.state.processVisible ? (<span className="icon--i_arrow-down"/>) : (<span className="icon--i_arrow-right"/>)}</a></p>
              { this.state.processVisible ?
                (
                <div className="processData" style={{paddingTop: '1px'}}>
                  <p><img src="/img/icons/score_objects.svg" style={{paddingTop: '2px'}}/> OBJECTS {(selectedOutput.features.summary.scores.objects * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.objects * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.objects * 25)).fill('.').join('')}</span></p>
                  <p><img src="/img/icons/score_faces.svg" style={{paddingTop: '2px'}}/> FACES {(selectedOutput.features.summary.scores.faces * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.faces * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.faces * 25)).fill('.').join('')}</span></p>
                  <p><img src="/img/icons/score_composition.svg" style={{paddingTop: '2px'}}/> COMPOSITION {(selectedOutput.features.summary.scores.composition * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.composition * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.composition * 25)).fill('.').join('')}</span></p>
                  <p><img src="/img/icons/score_context.svg" style={{paddingTop: '2px'}}/> CONTEXT {(selectedOutput.features.summary.scores.context * 100).toFixed(2)}%<br/>
                  <span style={{color: 'white'}}>{new Array(parseInt(selectedOutput.features.summary.scores.context * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(selectedOutput.features.summary.scores.context * 25)).fill('.').join('')}</span></p>
                  <h3 className="font-data" style={styles.descriptionTitle}>AI Statement</h3>
                  <p className="font-data" style={styles.descriptionText}>{this.props.descriptionIn}</p>
                  <p className="font-data" style={[styles.descriptionText, {marginBottom: '32px'}]}>{this.props.descriptionOut}</p>

                  <ShareModal  url={"http://recognition.tate.org.uk/gallery/" + itemId}/>
                </div>
                ) : '' }
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid hidden-xs">
        <div className="row" style={styles.rowImg}>

          <div className="col-sm-5 col-sm-offset-1"style={[styles.leftImg]} >
            <BoundedImage item={item.input}
                          features={selectedOutput.features.in}
                          onOver={this.handleLeftOverCanvas}
                          overHash={this.state.overRight}
                          parent={this}
            />
          </div>
          <div className="col-sm-5 col-sm-offset-1">
            <BoundedImage item={selectedOutput}
                          features={selectedOutput.features.out}
                          onOver={this.handleRightOverCanvas}
                          overHash={this.state.overLeft}
                          parent={this}
            />
          </div>

        </div>
        <div className="row" style={styles.dataRow}>

          <div className="col-sm-6" style={{paddingLeft: '30px', paddingTop: '20px'}}>
            <Link className="font-data" style={[styles.link]} to={`/gallery/${itemId}`}><span className='icon--i_arrow-left'/> Back to match</Link>
            <DetailFeatures item={item.input}
                            source={'reuters'}
                            features={selectedOutput.features.in}
                            scores={selectedOutput.features.summary.scores}
                            onOver={this.handleLeftOverFeatures}
                            onOverTags={this.handleOverTags}
                            onOverFace={this.handleLeftOverFace}
                            overHash={this.state.overRight}
                            overImg={this.state.overImg}
                            overTags={this.state.overTags}
                            parent={this}
            />
          </div>

          <div className="col-sm-6">
            <p style={{marginBottom:'64px'}}>&nbsp;</p>
            <DetailFeatures item={selectedOutput}
                            source={'tate'}
                            features={selectedOutput.features.out}
                            scores={selectedOutput.features.summary.scores}
                            onOver={this.handleRightOverFeatures}
                            onOverTags={this.handleOverTags}
                            onOverFace={this.handleRightOverFace}
                            overImg={this.state.overImg}
                            overHash={this.state.overLeft}
                            overTags={this.state.overTags}
                            parent={this}
            />
          </div>

        </div>
      </div>
      <DocMeta tags={meta} />
      <GoogleTagManager dataLayerName={'Detail_' + itemId} />
    </div>);
  }
}

export default Detail;
