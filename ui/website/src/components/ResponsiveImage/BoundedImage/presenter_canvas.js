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
import ReactDOM from 'react-dom';
import Radium from 'radium';
import moment from 'moment';
import styles from './styles.js';
import { browserHistory } from 'react-router'

@Radium
class CanvasImage extends React.Component {

  state = {
    hoverHash: [],
    hoverIndex: -1
  };

  renderBox(index, box) {

    let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
    let ctx = canvas.getContext('2d');

    const item = this.props.item;
    let [x, y, width, height] = box;

    const colorStyle = 'rgba(0,225,204,1)';

    let lineWidth = 2;
    if(canvas.width > 600)
      lineWidth = 3;
    if(canvas.width > 1000)
      lineWidth = 5;

    if(x < lineWidth / 2)
      x = lineWidth / 2;
    if(y < lineWidth / 2)
      y = lineWidth / 2;

    if((x + width) > item.meta.width)
      width = item.meta.width - lineWidth - x;
    if((y + height) > item.meta.height)
      height = item.meta.height - lineWidth - y;

    // Left segment
    ctx.strokeStyle = colorStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x + width / 10, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width / 10, y + height);
    ctx.stroke();

    // Right segment
    ctx.beginPath();
    ctx.moveTo(x + 9 * width / 10, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + 9 * width / 10, y + height);
    ctx.stroke();

    /*
    ctx.font = "30px Arial";
    ctx.fillStyle = 'rgba(225,0,0,1)';
    ctx.fillText(this.props.boxids[index].map(i => i.slice(0, 2)).join(','), x,y+height);
    ctx.fillStyle = 'rgba(0,0,225,1)';
    ctx.fillText(index,x+width,y);
    */
  }

  renderBoxes() {
    if(this.props.displayOverlay) {
      this.props.boxes.forEach((box, i) => this.renderBox(i, box));
    }
  }

  createCanvas() {
    const item = this.props.item;
    const densemap = this.props.densemap;

    let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
    let ctx = canvas.getContext('2d');

    canvas.width = item.meta.width;
    canvas.height = item.meta.height;

    let background = new Image();
    background.src = item.img;

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = (() => {
      ctx.drawImage(background,0,0);
      this.renderBoxes()
      canvas.onclick = ((e) => {
        console.log('click');
        this.props.parent.handleCanvasClick()
      });
    });
  }

  componentWillReceiveProps() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let background = new Image();
    background.src = this.props.item.img;
    ctx.drawImage(background,0,0);
    return true;
  }

  componentDidMount() {
    this.createCanvas();
  }

  componentDidUpdate() {
    this.renderBoxes();
  }

  render() {
    return (<div>
      <canvas ref="canvasImage"/>
    </div>);
  }

}
export default CanvasImage;
