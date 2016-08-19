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

  state = {hovered: false, objHovered: ''}

  getIconUrl(obj) {
    let state = '';
    if(this.state.hovered)
      state = this.state.objHovered == obj ? '_hover' : '_nothover';
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

    return(<div className={this.state.hovered ? 'detailFeatures detailHovered' : 'detailFeatures'}
      style={[styles.detailColumn, this.state.hovered ? styles.columnHovered : '']}>
      <p>{this.state.hovered} - {this.state.objHovered}</p>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
            <tr>
              <td>DATE:</td>
              <td>{date}</td>
            </tr>
            <tr>
              <td>TITLE:</td>
              <td>{title}</td>
            </tr>
            <tr>
              <td>AUTHOR:</td>
              <td>{item.meta['author']}</td>
            </tr>
            <tr>
              <td>SOURCE:</td>
              <td>{this.props.source}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={this.state.objHovered == 'objects' ? 'hovered' : ''}
          onMouseOver={() => {this.setState({hovered: false, objhovered: 'objects'})}}
          onMouseOut={() => {this.setState({hovered: false, objHovered: ''})}}
      >
        <img src={this.getIconUrl('objects')}/> OBJECTS {(scores.objects * 100).toFixed(2)}%
      </h3>
      <div className="table-responsive"
           style={[styles.tableOverflow]}
           onMouseOver={() => {this.setState({hovered: true, objHovered: 'objects'})}}
           onMouseOut={() => {this.setState({hovered: false, objHovered: ''})}}
      >
        <table className="table borderless">
          <tbody>
            {
              features.densecap.captions.map((caption, index) => {

                let duplicates = false;
                if(this.props.overHash.hash.length > 0) {
                  const mergedBoxids = features.densecap.boxids[index].concat(this.props.overHash.hash);
                  duplicates  = mergedBoxids.reduce(function(acc, el, i, arr) {
                    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
                      acc.push(el);
                      return acc;
                    }, []).length > 0;
                }

                const rowStyle = [
                  styles.rowHover,
                  duplicates || index == this.props.overHash.index ? styles.rowHovered: ''
                ]

                return (<tr key={'densecap-' + index}
                            style={rowStyle}
                            onMouseOver={() => {
                              this.props.onOver.bind(
                                null,
                                this.props.parent,
                                features.densecap.boxids[index],
                                index
                              )
                            }}
                            onMouseOut={() => {
                              this.props.onOver.bind(
                                null,
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

      <h3 className={this.state.objHovered == 'faces' ? 'hovered' : ''}
          onMouseOver={() => {this.setState({hovered: true, objHovered: 'faces'})}}
          onMouseOut={() => {this.setState({hovered: false, objHovered: ''})}}
      >
        <img src={this.getIconUrl('faces')}/> FACES {(scores.faces * 100).toFixed(2)}%
      </h3>
      <div className="table-responsive"
           style={[styles.tableOverflow]}
           onMouseOver={() => {this.setState({hovered: true, objHovered: 'faces'})}}
           onMouseOut={() => {this.setState({hovered: false, objHovered: ''})}}
      >
      {
        features.mapi ? (features.mapi.ages.map((age, index) => {

          let hoverStyle = {};

          if((index + features.densecap.boxids.length) == this.props.overHash.index)
            hoverStyle = {color: '#0FC'};

          return(<div>
            <h4 style={hoverStyle}>SUBJECT {index + 1}</h4>
            <table className="table borderless" style={hoverStyle}>
              <tbody>
                <tr><td>AGE:</td><td>{age}</td></tr>
                <tr><td>GENDER:</td><td>{features.mapi.genders[index]}</td></tr>
                {Object.keys(features.mapi.emotions[index]).length === 0 ? (<tr><td>EMOTION:</td><td></td></tr>) : ''}
              </tbody>
            </table>
          </div>);
        })) : ''
      }
      </div>

      <h3 className={this.state.objHovered == 'composition' ? 'hovered' : ''}
          onMouseOver={() => {this.setState({hovered: true, objHovered: 'composition'})}}
          onMouseOut={() => {this.setState({hovered: false, objHovered: ''})}}
      >
        <img src={this.getIconUrl('composition')}/> COMPOSITION {(scores.composition * 100).toFixed(2)}%
      </h3>

      <h3 className={this.state.objHovered == 'context' ? 'hovered' : ''}
          onMouseOver={() => {this.setState({hovered: true, objHovered: 'context'})}}
          onMouseOut={() => {this.setState({hovered: false, objHovered: ''})}}
      >
        <img src={this.getIconUrl('context')}/> CONTEXT {(scores.context * 100).toFixed(2)}%
      </h3>
      { tags.length > 0 ? (<div><h4>TAGS</h4><p>{tags.join(', ')}</p></div>) : ''}

      { features.places ? (<div><h4>PLACES</h4><p>{features.places.tags.join(', ')}</p></div>) : ''}

    </div>);
  }
}

export default DetailFeatures;
