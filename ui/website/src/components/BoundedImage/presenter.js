/*
Copyright 2016 Fabrica S.P.A., Emmanuel Benazera, Alexandre Girard

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import styles from './styles.js';
import { browserHistory } from 'react-router'
import SvgImage from './presenter_svg';
import HtmlImage from './presenter_html';
import CanvasImage from './presenter_canvas';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class BoundedImage extends React.Component {

  render() {

    console.log("render");
    console.log(this.props);
    if(this.props.boxes.length > 0) {
      return (<CanvasImage item={this.props.item} boxes={this.props.boxes}/>)
    } else {
      return (<HtmlImage img={this.props.item.img}/>)
    }

  }
}

export default BoundedImage;
