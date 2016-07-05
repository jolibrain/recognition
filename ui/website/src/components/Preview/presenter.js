import React from 'react';
import LeftRight from './LeftRight';
import ThumbSelector from './ThumbSelector';

function Preview({ photos = [], onSelectPhoto}) {

  const style = {
    'margin-top': '20px',
    'padding-bottom': '20px',
    'border-bottom': '1px solid #666'
  };

  return (
    <div className="fluid-container">
      {
        photos.map((photo, key) => {
          return (<div className="photo" key={key} style={style}>
            <LeftRight photo={photo}/>
            <ThumbSelector photo={photo} onClick={onSelectPhoto} />
          </div>);
        })
      }
    </div>
  );
}

export default Preview;
