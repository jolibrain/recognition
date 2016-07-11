import React from 'react';
import JSONPretty from 'react-json-pretty';

require('react-json-pretty/JSONPretty.monikai.styl');

function GalleryItem({match = {}, onSelectMatchItem }) {

  console.log(onSelectMatchItem);

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
          <img className="img-responsive" src={match.input.img} />
        </div>
        <div className="col-md-6">
          <img className="img-responsive" src={match.output.filter(item => item.selected)[0].img} />
        </div>
      </div>

      <div className="row">
      {
        match.output.map((item, key) => {
          return <img key={key} style={{width: "150px", padding: "5px"}} src={item.img} onClick={onSelectMatchItem.bind(this, match, item)}/>
        })
      }
      </div>

    </div>

    <div className="col-md-3">
      <JSONPretty id="json-pretty" json={match.output.filter(item => item.selected)}></JSONPretty>
    </div>

  </div>

  );
}

export default GalleryItem;
