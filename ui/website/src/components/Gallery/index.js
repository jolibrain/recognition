import React from 'react';
import {Link} from 'react-router';
import GalleryItem from '../GalleryItem';

function Gallery() {
  return <div>

    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <GalleryItem/>
          <GalleryItem/>
        </div>
        <div className="col-md-6">
          <GalleryItem/>
          <GalleryItem/>
        </div>
      </div>
    </div>

  </div>;
}

export default Gallery;
