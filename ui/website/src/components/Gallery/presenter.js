import React from 'react';
import Radium from 'radium';
import styles from './styles.js';
import GalleryItem from '../GalleryItem';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Gallery extends React.Component {

  render() {

      return (<div className="container">
        {
          this.props.matches.map((item, key) => {
            return <GalleryItem key={key} item={item}/>
          })
        }
      </div>);

  }
}

export default Gallery;
