import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import styles from './styles.js';
import { browserHistory } from 'react-router'
import SvgImage from './presenter_svg';
import HtmlImage from './presenter_html';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class BoundedImage extends React.Component {

  render() {

    console.log(this.props.densecap);

    if(this.props.densecap) {
      return (<SvgImage item={this.props.item} densecap={this.props.densecap}/>)
    } else {
      return (<HtmlImage img={this.props.item.img}/>)
    }

  }
}

export default BoundedImage;
