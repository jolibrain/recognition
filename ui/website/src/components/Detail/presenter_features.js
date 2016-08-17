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

@Radium
class DetailFeatures extends React.Component {

  render() {

    if(!this.props.item || !this.props.features) return null;

    const item = this.props.item;
    const features = this.props.features;
    const scores = this.props.scores;

    if(item.meta.html_content) {
      item.meta.html_content = '...';
    }

    let title = item.meta['title'];
    if(this.props.source == 'reuters')
      title = item.meta['caption'];

    return(<div className="detailFeatures" style={[styles.detailColumn]}>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
            <tr>
              <td>DATE:</td>
              <td>{item.meta['date']}</td>
            </tr>
            <tr>
              <td>TITLE:</td>
              <td>{item.meta['title']}</td>
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

      <h3><img src="/img/icons/score_objects.png"/> OBJECTS {(scores.objects * 100).toFixed(2)}%</h3>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
            {
              features.densecap.captions.map((caption, index) => {

                const rowStyle = [
                  styles.rowHover,
                  features.densecap.boxids[index] == this.props.overHash ? styles.rowHovered: ''
                ]

                return (<tr key={'densecap-' + index}
                            style={rowStyle}
                            onMouseEnter={
                              this.props.onOver.bind(null,
                                this.props.parent,
                                features.densecap.boxids[index])
                            }
                            onMouseLeave={
                              this.props.onOver.bind(null,
                                this.props.parent,
                                '')
                            }
                        >
                  <td>{index + 1}</td>
                  <td>{caption}</td>
                </tr>);
              })
            }
          </tbody>
        </table>
      </div>

      <h3><img src="/img/icons/score_faces.png"/> FACES {(scores.faces * 100).toFixed(2)}%</h3>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
          </tbody>
        </table>
      </div>

      <h3><img src="/img/icons/score_composition.png"/> COMPOSITION {(scores.composition * 100).toFixed(2)}%</h3>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
          </tbody>
        </table>
      </div>

      <h3><img src="/img/icons/score_context.png"/> CONTEXT {(scores.context * 100).toFixed(2)}%</h3>
      { item.meta.tags ? (<div><h4>TAGS</h4><p>{item.meta.tags.join(', ')}</p></div>) : ''}

      { features.places ? (<p>PLACES: {features.places.tags.join(', ')}</p>) : ''}

    </div>);
  }
}

export default DetailFeatures;
