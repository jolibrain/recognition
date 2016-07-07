import React from 'react';
import {Link} from 'react-router';
import GalleryItem from '../GalleryItem';

function Gallery({matches = []}) {

  return (<div className="container">
    {

      matches.map((match, key) => {

        return <GalleryItem key={key} match={match} />;

      })

    }
  </div>);
}

export default Gallery;
