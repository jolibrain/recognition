import React from 'react';

function LeftRight({ photo }) {

  const style = {height: '400px'};

  return (
    <div className="row" style={{'margin-bottom': '10px'}}>
      <div className="col-md-6">
        <img className="img-responsive center-block" style={style} src={`img/${photo.id}.jpg`}/>
      </div>
      <div className="col-md-6">
        {
          photo.selected != null ?
            <img className="img-responsive" style={style} src={`img/${photo.id}/${photo.selected}.jpg`}/> :
            <p></p>
        }
      </div>
    </div>
  );
}

export default LeftRight;
