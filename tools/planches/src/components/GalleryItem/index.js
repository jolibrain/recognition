import React from 'react';
import {Link} from 'react-router';
import JSONPretty from 'react-json-pretty';

function GalleryItem({input = {},  outputs = [] }) {
  return (<div>
  <div className="row">

    <div className="col-md-3">
      <img className="img-responsive" src={input.path} />
    </div>

    <div className="col-md-8 col-offset-1">
      {
        outputs.map(item => {
          <img className="img-thumbnail" src={item.output.img} />
        })
      }
    </div>

  </div>

  <div className="row">
    <div className="col-md-12">
      <JSONPretty id="json-pretty" json={input}></JSONPretty>
    </div>
  </div>

  </div>);
}

export default GalleryItem;
