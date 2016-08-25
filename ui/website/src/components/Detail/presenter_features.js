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

@Radium
class DetailFeatures extends React.Component {

  state = {tags: false, places: false};

  getIconUrl(obj, hovered, objHovered) {
    let state = '';
    if(hovered)
      state = objHovered == obj ? '_hover' : '_nothover';
    return `/img/icons/score_${obj}${state}.png`;
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

    let hovered = this.state.tags || this.state.places;
    let objHovered = hovered ? 'context' : '';

    hovered = hovered || this.props.hovered;

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
    } else if(typeof features.mapi != 'undefined' &&
              typeof features.mapi.ages != 'undefined' &&
              features.mapi.ages.length > 0 &&
              features.mapi.ages.some((caption, index) => {

      let duplicates = false;
      if(this.props.overHash.hash.length > 0) {
        const mergedBoxids = features.mapi.boxids[index].concat(this.props.overHash.hash);
        duplicates  = mergedBoxids.reduce(function(acc, el, i, arr) {
          if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
            acc.push(el);
            return acc;
          }, []).length > 0;
      }

      return duplicates;
    }) || (typeof this.props.overHash.index != 'undefined' &&
      this.props.overHash.index != -1 &&
      this.props.overHash.index - features.densecap.boxids.length < features.mapi.boxids.length)) {
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

    return(<div className={hovered ? 'detailFeatures detailHovered' : 'detailFeatures'}
      style={[styles.detailColumn, hovered ? styles.columnHovered : '']}>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
            <tr>
              <td colSpan="2">{date}</td>
            </tr>
            <tr>
              <td colSpan="2">{title}</td>
            </tr>
            { typeof author != 'undefined' && author.length > 0 ?
            (<tr>
              <td>AUTHOR:</td>
              <td>{author}</td>
            </tr>) : '' }
            <tr>
              <td>SOURCE:</td>
              <td>{this.props.source}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={objHovered == 'objects' ? 'hovered' : ''}>
        <img src={this.getIconUrl('objects', hovered, objHovered)}/> OBJECTS {(scores.objects * 100).toFixed(2)}%
      </h3>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
            {
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
        <img src={this.getIconUrl('faces', hovered, objHovered)}/> FACES {(scores.faces * 100).toFixed(2)}%
      </h3>
      { typeof features.mapi != 'undefined' ? (<div className="table-responsive" style={[styles.tableOverflow]}>
      {
        mapi_ages.map((age, index) => {

          let duplicates = false;
          if(this.props.overHash.hash.length > 0) {
            const mergedBoxids = features.mapi.boxids[index].concat(this.props.overHash.hash);
            duplicates  = mergedBoxids.reduce(function(acc, el, i, arr) {
              if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
                acc.push(el);
                return acc;
              }, []).length > 0;
          }

          if(typeof this.props.overHash.index != 'undefined' &&
             this.props.overHash.index == index + features.densecap.boxids.length) {
            duplicates = true;
          }

          const rowStyle = [
            styles.rowHover,
            duplicates ? styles.rowHovered: ''
          ]

          let densecapLength = 0;
          if(typeof features != 'undefined' &&
             typeof features.densecap != 'undefined' &&
             typeof features.densecap.captions != 'undefined' &&
             features.densecap.captions.length > 0)
              densecapLength = features.densecap.boxids.length;

          const mapiIndex = index + densecapLength;

          return(<div key={'mapi' + index}
          onMouseOver={() => {
            this.props.source == 'reuters' ?
            this.props.onOver(
              this.props.parent,
              features.mapi.boxids[index]
            ) :
            this.props.onOver(
              this.props.parent,
              features.mapi.boxids[index],
              mapiIndex
            )
          }}
          onMouseOut={() => {
            this.props.source == 'reuters' ?
            this.props.onOver(
              this.props.parent,
              []
            ) :
            this.props.onOver(
              this.props.parent,
              [],
              -1
            )
          }}
          >
            <h4 className={duplicates ? 'selected': 'notSelected'}>SUBJECT {index + 1}</h4>
            <table className="table borderless" style={rowStyle} key={'mapiTable' + index}>
              <tbody>
                <tr><td>AGE:</td><td>{age}</td></tr>
                <tr><td>GENDER:</td><td>{features.mapi.genders[index]}</td></tr>
                {Object.keys(features.mapi.emotions[index]).length != 0 ? (<tr key={'emotion' + index}><td>EMOTION:</td><td></td></tr>) : <tr></tr>}
              </tbody>
            </table>
          </div>);
        })
      }
      </div>) : '' }

      <h3 className={objHovered == 'composition' ? 'hovered' : ''}>
        <img src={this.getIconUrl('composition', hovered, objHovered)}/> COMPOSITION {(scores.composition * 100).toFixed(2)}%
      </h3>

      <h3 className={objHovered == 'context' ? 'hovered' : ''}>
        <img src={this.getIconUrl('context', hovered, objHovered)}/> CONTEXT {(scores.context * 100).toFixed(2)}%
      </h3>
      {
        tags.length > 0 ? (<div key={'tagsDiv'} style={[styles.rowHover, this.state.tags ? styles.rowHovered: '']}><h4 key={'tagsTitle'} style={[styles.tagsHover, this.state.tags ? styles.rowHovered: '']}>TAGS</h4><p onMouseOver={() => {this.setState({tags: true})}} onMouseOut={() => {this.setState({tags: false})}}>{tags.join(', ')}</p></div>) : ''
      }

      { (typeof features.places != 'undefined' && features.places.length > 0) ? (<div key={'placesDiv'} style={[styles.rowHover, this.state.places ? styles.placesHovered: '']}><h4 key={'placesTitle'} style={[styles.rowHover, this.state.places ? styles.rowHovered: '']}>PLACES</h4><p onMouseOver={() => {this.setState({places: true})}} onMouseOut={() => {this.setState({places: false})}}>{tags.join(', ')}>{features.places.tags.join(', ')}</p></div>) : ''}

    </div>);
  }
}

export default DetailFeatures;
