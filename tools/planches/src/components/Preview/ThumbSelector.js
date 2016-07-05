import React from 'react';

function ThumbSelector({ photo, onClick }) {

  let indexedArray = [];
  for (var i = 0; i < 10; i++) {
    indexedArray.push(i);
  }

  return (
    <div>
      <div className="row">
        {
          [0,1,2,3,4].map((index, key) => {

            const photo_url = "img/" + photo.id + "/" + index + ".jpg";
            let classname = "col-md-2";
            const style = {width:'200px'};

            if(index % 5 === 0) {
              classname += " col-md-offset-1";
            };

            return (
            <div onClick={() => onClick(photo, index)}
                 className={classname}
                 key={key}>
              <img style={style} className="img-responsive" src={photo_url}/>
            </div>);
          })
        }
      </div>
      <div className="row">
        {
          [5,6,7,8,9].map((index, key) => {

            const photo_url = "img/" + photo.id + "/" + index + ".jpg";
            let classname = "col-md-2";
            const style = {width:'200px'};

            if(index % 5 === 0) {
              classname += " col-md-offset-1";
            };

            return (
            <div onClick={() => onClick(photo, index)}
                 className={classname}
                 key={key}>
              <img style={style} className="img-responsive" src={photo_url}/>
            </div>);
          })
        }
      </div>
    </div>
  );
}

export default ThumbSelector;
