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

    if(item.meta.html_content) {
      item.meta.html_content = '...';
    }

    return(<div style={[styles.detailColumn]}>
      <div className="table-responsive" style={[styles.tableOverflow]}>
        <table className="table borderless">
          <tbody>
          {
            Object.keys(item.meta).map(key => {
              return (<tr key={key}>
                <td>{key}:</td>
                <td>{item.meta[key]}</td>
              </tr>);
            })
          }
          </tbody>
        </table>
      </div>

      <hr/>

      {
        Object.keys(features).map(feature_key => {
          const feature = features[feature_key];
          if(feature.captions) {
            return (<div key={feature_key}>
              <h5 style={[styles.underline]}>{feature_key}</h5>
              <div className="table-responsive">
                <table className="table borderless">
                  <tbody>
                  {
                    feature.captions.map((caption, index) => {
                      return (<tr key={index}>
                        <td>{caption}</td>
                        <td>{feature.scores[index]}</td>
                      </tr>);
                    })
                  }
                  </tbody>
                </table>
              </div>
            </div>);
          } else if(feature.tags) {
            return (<div key={feature_key}>
              <h5 style={[styles.underline]}>{feature_key}</h5>
              <p>{feature.tags.join(', ')}</p>
            </div>);
          } else {
            return (<div key={feature_key}>
              <h5 style={[styles.underline]}>{feature_key}</h5>
              <p>{feature.description}: {feature.score}</p>
            </div>);
          }
        })
      }
    </div>);
  }
}

export default DetailFeatures;

/*
<JSONPretty id="json-pretty" json={item.meta} style={styles.json}></JSONPretty>
<JSONPretty id="json-pretty" json={features} style={styles.json}></JSONPretty>
*/
