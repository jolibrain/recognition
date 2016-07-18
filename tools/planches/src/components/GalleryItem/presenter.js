import React from 'react';
import JSONPretty from 'react-json-pretty';

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
                <img className="img-responsive figure-img img-fluid" src={match.input.img} />
                <figcaption className="figure-caption">{match.input.meta.caption}</figcaption>
              </figure>
            </div>
            <div className="col-md-6">
              <figure className="figure">
                <img className="img-responsive figure-img img-fluid" src={selectedOutput.img} />
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
