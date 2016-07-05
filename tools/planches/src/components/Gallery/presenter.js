import React from 'react';
import {Link} from 'react-router';
import GalleryItem from '../GalleryItem';

function Gallery({matches = [], onSelectMatch}) {
  return (<div className="fluid-container">
    {
      matches.map((match, key) => {
        const outputs = matches.filter(item => item.input.img === match.input.img);

        //return <GalleryItem match={match} />;
        return <GalleryItem key={match.id} input={match} outputs={outputs} />;
      })
    }
  </div>);
}

export default Gallery;
