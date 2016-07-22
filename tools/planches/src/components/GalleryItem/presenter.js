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
import JSONPretty from 'react-json-pretty';
import BoundedImage from '../BoundedImage';

require('react-json-pretty/JSONPretty.monikai.styl');

function GalleryItem({match = {}, onSelectMatchItem }) {

    const selectedOutput = match.output.filter(item => item.selected)[0];
    const visibleOutputs = match.output.filter(item => item.visible);

    return (
      <div className="row" style={{
        "borderBottom": "1px solid #666",
        "paddingBottom": "20px",
        "marginBottom": "20px"
      }}>

        <div className="col-md-9">

          <div className="row" style={{
            "marginBottom": "20px"
          }}>
            <div className="col-md-6">
              <figure className="figure">
                <BoundedImage item={match.input} features={selectedOutput.features.in}/>
                <figcaption className="figure-caption">{match.input.meta.caption}</figcaption>
              </figure>
            </div>
            <div className="col-md-6">
              <figure className="figure">
                <BoundedImage item={selectedOutput} features={selectedOutput.features.in}/>
                <figcaption className="figure-caption">{selectedOutput.meta.title}</figcaption>
              </figure>
            </div>
          </div>

          <div className="row">
          {
            visibleOutputs.map((item, key) => {
              return <img key={key} style={{width: "150px", padding: "5px"}} src={item.img} onClick={onSelectMatchItem.bind(this, match, item)}/>
            })
          }
          </div>

        </div>

        <div className="col-md-3">
          <JSONPretty id="json-pretty" json={selectedOutput}></JSONPretty>
        </div>

      </div>
    );
}

export default GalleryItem;
