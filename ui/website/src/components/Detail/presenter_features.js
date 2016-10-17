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
import unique from 'array-unique';

@Radium
class DetailFeatures extends React.Component {

  state = {tags: false, places: false};

  getIconUrl(obj, hovered, objHovered) {
    let state = '';
    if(hovered)
      state = objHovered == obj ? '_hover' : '_nothover';
    return `/img/icons/score_${obj}${state}.svg`;
  }

  render() {

    if(!this.props.item || !this.props.features) return null;

    const item = this.props.item;
    const features = this.props.features;
    const scores = this.props.scores;

    if(item.meta.html_content) {
      item.meta.html_content = '...';
    }

    let title = item.meta['title'];
    let date = item.meta['date'];
    if(this.props.source == 'reuters') {
      title = item.meta['caption'];
      date = moment(date).format('DD/MM/YYYY');
    }

    let tags = [];
    if(features.mapi_tags)    tags = tags.concat(features.mapi_tags.tags);
    if(features.places)       tags = tags.concat(features.places.tags);
    if(features.categories_1) tags = tags.concat(features.categories_1.tags);
    if(features.categories_2) tags = tags.concat(features.categories_2.tags);
    if(features.categories_3) tags = tags.concat(features.categories_3.tags);
    if(features.mapi_cats)    tags = tags.concat(features.mapi_cats.tags);

    let all_tags = [];
    if(features.mapi_tags)    all_tags = all_tags.concat(features.mapi_tags.all_tags);
    if(features.places)       all_tags = all_tags.concat(features.places.all_tags);
    if(features.categories_1) all_tags = all_tags.concat(features.categories_1.all_tags);
    if(features.categories_2) all_tags = all_tags.concat(features.categories_2.all_tags);
    if(features.categories_3) all_tags = all_tags.concat(features.categories_3.all_tags);
    if(features.mapi_cats)    all_tags = all_tags.concat(features.mapi_cats.all_tags);

    unique(tags);
    unique(all_tags);

    let hovered = this.state.tags || this.state.places || this.props.overTags;
    let objHovered = hovered ? 'context' : '';

    if(this.props.overTags) {
      objHovered = 'context';
    }

    hovered = hovered || this.props.overImg || this.props.overHash.hash.join('').length > 0;

    if(typeof features.densecap != 'undefined' &&
       typeof features.densecap.captions != 'undefined' &&
       features.densecap.captions.length > 0 &&
       features.densecap.captions.some((caption, index) => {

      let duplicates = false;
      if(this.props.overHash.hash.length > 0) {
        const mergedBoxids = features.densecap.boxids[index].concat(this.props.overHash.hash);
        duplicates  = mergedBoxids.reduce(function(acc, el, i, arr) {
          if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
            acc.push(el);
            return acc;
          }, []).length > 0;
      }

      return duplicates;
    }) || (typeof this.props.overHash.index != 'undefined' &&
      this.props.overHash.index != -1 &&
      this.props.overHash.index < features.densecap.boxids.length)) {
      hovered = true;
      objHovered = 'objects';
    } else if((typeof this.props.overHash.hash != 'undefined' &&
        this.props.overHash.hash.join('').indexOf('-') != -1 &&
        typeof features.mapi.faceRectangles != 'undefined' &&
        features.mapi.faceRectangles.some(face => {
          const faceId = face.left + '-' + face.top + '-' + face.width + '-' + face.height;
          return this.props.overHash.hash.join('') == faceId;
        })
      ) ||
      (typeof this.props.overHash.index != 'undefined' &&
      this.props.overHash.index != -1 &&
      this.props.overHash.index - features.densecap.boxids.length < features.mapi.faceRectangles.length)) {
      hovered = true;
      objHovered = 'faces';
    }

    /* DEBUG
      <p>{hovered ? 1 : 0} - {objHovered}</p>
      */

    const author = Array.isArray(item.meta.author) ? item.meta.author[0] : item.meta.author;

    let densecap_captions = [];
    if(typeof features != 'undefined' &&
       typeof features.densecap != 'undefined' &&
       typeof features.densecap.captions != 'undefined' &&
       features.densecap.captions.length > 0)
        densecap_captions = features.densecap.captions;

    let mapi_ages = [];
    if(typeof features != 'undefined' &&
       typeof features.mapi != 'undefined' &&
       typeof features.mapi.ages != 'undefined' &&
       features.mapi.ages.length > 0)
        mapi_ages = features.mapi.ages;

    let source = this.props.source;
    if(source == 'tate') {
      source = (<a className="tateLink" href={this.props.item.meta.link} target="_blank" rel="noopener noreferrer" >TATE <img src="/img/icons/external_link.png"/></a>);
    }

    return(<div className={hovered ? 'font-data detailFeatures detailHovered' : 'font-data detailFeatures'}
      style={[styles.detailColumn, hovered ? styles.columnHovered : '']}>

      { this.props.source == "reuters" ?
        (<div style={{paddingBottom: '14px'}}><h3 style={{textDecoration: "underline"}}>AI STATEMENT</h3><p style={{textTransform: 'uppercase'}}>{this.props.captionIn}.<br/>{this.props.captionOut}.</p></div>) : ""}

      <div className="table-responsive" style={[styles.tableOverflow, styles.categoryBottom]}>
        <p>{date}<br/>
        {title}<br/>
        { typeof author != 'undefined' && author.length > 0 ? (<span>AUTHOR: {author}<br/></span>) : ''}
        SOURCE: {source}</p>
      </div>

      <h3 className={objHovered == 'objects' ? 'hovered' : ''}>
        <img style={{paddingBottom: '3px'}} src={this.getIconUrl('objects', hovered, objHovered)}/> OBJECTS {(scores.objects * 100).toFixed(2)}%
      </h3>
      <p><span style={{color: 'white'}}>{new Array(parseInt(this.props.scores.objects * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(this.props.scores.objects * 25)).fill('.').join('')}</span></p>
      <div className="table-responsive" style={[styles.tableOverflow, styles.categoryBottom]}>
        <table className="table borderless">
          <tbody>
            {
              densecap_captions.length == 0 ? (<tr><td>No objects found</td></tr>) :
              densecap_captions.map((caption, index) => {

                let duplicates = false;
                if(this.props.overHash.hash.length > 0) {
                  const mergedBoxids = features.densecap.boxids[index].concat(this.props.overHash.hash);
                  duplicates  = mergedBoxids.reduce(function(acc, el, i, arr) {
                    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
                      acc.push(el);
                      return acc;
                    }, []).length > 0;
                }

                if(typeof this.props.overHash.index != 'undefined' &&
                   this.props.overHash.index == index) {
                  duplicates = true;
                }

                const rowStyle = [
                  styles.rowHover,
                  duplicates ? styles.rowHovered: ''
                ]

                return (<tr key={'densecap-' + index}
                            style={[rowStyle]}
                            onMouseOver={() => {
                              this.props.source == 'reuters' ?
                              this.props.onOver(
                                this.props.parent,
                                features.densecap.boxids[index]
                              ) :
                              this.props.onOver(
                                this.props.parent,
                                features.densecap.boxids[index],
                                index
                              )
                            }}
                            onMouseOut={() => {
                              this.props.source == 'reuters' ?
                              this.props.onOver(
                                this.props.parent,
                                features.densecap.boxids[index]
                              ) :
                              this.props.onOver(
                                this.props.parent,
                                [],
                                -1
                              )
                            }}
                        >
                  <td>{index + 1}</td>
                  <td>{caption}</td>
                </tr>);
              })
            }
          </tbody>
        </table>
      </div>

      <h3 className={objHovered == 'faces' ? 'hovered' : ''}>
        <img style={{paddingBottom: '3px'}} src={this.getIconUrl('faces', hovered, objHovered)}/> FACES {(scores.faces * 100).toFixed(2)}%
      </h3>
      <p><span style={{color: 'white'}}>{new Array(parseInt(this.props.scores.faces * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(this.props.scores.faces * 25)).fill('.').join('')}</span></p>
      { typeof features.mapi != 'undefined' ? (<div className="table-responsive" style={[styles.tableOverflow, styles.categoryBottom]}>
      {
        mapi_ages.length == 0 ? (<p>No faces found</p>) :
        mapi_ages.map((age, index) => {

          const face = features.mapi.faceRectangles[index];
          const fakeBoxId = face.left + '-' + face.top + '-' + face.width + '-' + face.height;

          let selected = false;
          if(this.props.overHash.hash.length > 0 &&
            this.props.overHash.hash.join('').indexOf('-') != -1) {
              selected = (this.props.overHash.hash.join('') == fakeBoxId);
          }

          if(typeof this.props.overHash.index != 'undefined' &&
             this.props.overHash.index == index + features.densecap.boxids.length) {
            selected = true;
          }

          const rowStyle = [
            styles.rowHover,
            selected ? styles.rowHovered: ''
          ]

          let densecapLength = 0;
          if(typeof features != 'undefined' &&
             typeof features.densecap != 'undefined' &&
             typeof features.densecap.captions != 'undefined' &&
             features.densecap.captions.length > 0)
              densecapLength = features.densecap.boxids.length;

          const mapiIndex = index + densecapLength;

          return(<div key={'mapi' + index} className="hoverable"
          onMouseOver={() => {
            this.props.onOverFace(
              this.props.parent,
              [fakeBoxId]
            )
          }}
          onMouseOut={() => {
            this.props.onOverFace(
              this.props.parent,
              []
            )
          }}
          >
            <h4 className={selected ? 'selected': 'notSelected'}>SUBJECT {index + 1}</h4>
            <p  className={selected ? 'selected': 'notSelected'}>AGE: {age}<br/>
            GENDER: {features.mapi.genders[index]}<br/>
            {(typeof features.mapi.emotions[index] != 'undefined') ? (Object.keys(features.mapi.emotions[index]).length != 0 ? (<span>EMOTION: {Object.keys(features.mapi.emotions[index])[0]}</span>) : '') : ''}
            </p>
          </div>);
        })
      }
      </div>) : (<div style={styles.categoryBottom}>&nbsp;</div>) }

      <h3 className={objHovered == 'composition' ? 'hovered' : ''}>
        <img style={{paddingBottom: '3px'}} src={this.getIconUrl('composition', hovered, objHovered)}/> COMPOSITION {(scores.composition * 100).toFixed(2)}%
      </h3>
      <p><span style={{color: 'white'}}>{new Array(parseInt(this.props.scores.composition * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(this.props.scores.composition * 25)).fill('.').join('')}</span></p>
      <div style={styles.categoryBottom}>&nbsp;</div>

      <h3 className={objHovered == 'context' ? 'hovered' : ''}>
        <img style={{paddingBottom: '3px'}} src={this.getIconUrl('context', hovered, objHovered)}/> CONTEXT {(scores.context * 100).toFixed(2)}%
      </h3>
      <p><span style={{color: 'white'}}>{new Array(parseInt(this.props.scores.context * 25)).fill('.').join('')}</span><span style={{color: '#4a4a4a'}}>{new Array(25 - parseInt(this.props.scores.context * 25)).fill('.').join('')}</span></p>
      {
        all_tags.length > 0 ? (
        <div key={'tagsDiv'} style={[styles.rowHover, this.state.tags || this.props.overTags ? styles.rowHovered: '']}>
          <h4 key={'tagsTitle'} style={[styles.tagsHover, this.state.tags || this.props.overTags ? styles.rowHovered: '']} onMouseOver={() => {
            this.setState({tags: true});
            this.props.onOverTags(this.props.parent, true);
          }} onMouseOut={() => {
            this.setState({tags: false});
            this.props.onOverTags(this.props.parent, false);
          }}>TAGS</h4>
          <p onMouseOver={() => {
            this.setState({tags: true});
            this.props.onOverTags(this.props.parent, true);
          }} onMouseOut={() => {
            this.setState({tags: false});
            this.props.onOverTags(this.props.parent, false);
          }} className={this.state.tags || this.props.overTags ? 'tagsHovered' : ''}>
            {all_tags.map(tag => {
              return (<span className={tags.indexOf(tag) != -1 ? 'tag containTag' : 'tag'}>{tag}, </span>);
            })}
          </p>
        </div>) : ''
      }

      { (typeof features.places != 'undefined' && features.places.length > 0) ? (<div key={'placesDiv'} style={[styles.rowHover, this.state.places ? styles.placesHovered: '']}><h4 key={'placesTitle'} style={[styles.rowHover, this.state.places ? styles.rowHovered: '']}>PLACES</h4><p onMouseOver={() => {this.setState({places: true})}} onMouseOut={() => {this.setState({places: false})}}>{tags.join(', ')}>{features.places.tags.join(', ')}</p></div>) : ''}

    </div>);
  }
}

export default DetailFeatures;
