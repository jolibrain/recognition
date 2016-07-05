import React from 'react';
import {Link} from 'react-router';
import GalleryItem from '../GalleryItem';

function Gallery({matches = [], onSelectMatch}) {
  return (<div className="fluid-container">
    {
      matches.map((match, key) => {
        outputs = matches.filter(item => item.input.img === match.input.img);

        //return <GalleryItem match={match} />;
        return <GalleryItem input={match} outputs={outputs} />;
      })
    }
  </div>);
}

export default Gallery;
