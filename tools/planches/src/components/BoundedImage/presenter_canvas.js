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

@Radium
class CanvasImage extends React.Component {

  state = {
    imgRatio: 0,
    hoverIndex: -1,
    redraw: false,
    currentImg: ""
  };

  renderBox(index, box, ctx) {
    const [x, y, width, height] = box;

    let colorStyle = 'rgba(225,0,0,1)';
    if(this.state.hoverIndex == index) {
      colorStyle = 'rgba(0,225,0,1)';
    }

    ctx.rect(x, y, width, height);
    ctx.fillStyle = 'rgba(225,225,225,0)';
    ctx.fill();

    ctx.strokeStyle = colorStyle;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + width / 10, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width / 10, y + height);
    ctx.stroke();

    ctx.strokeStyle = colorStyle;
    ctx.beginPath();
    ctx.moveTo(x + 9 * width / 10, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + 9 * width / 10, y + height);
    ctx.stroke();
  }

  renderBoxes(ctx) {
    let i = 0;
    let box;
    while(box = this.props.boxes[i++]) {
      this.renderBox(i, box, ctx);
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

      this.renderBoxes(ctx)

      canvas.onmousemove = ((e) => {

        this.setState({hoverIndex: -1});

        // Get the current mouse position
        const r = canvas.getBoundingClientRect();
        const scaleX = canvas.width / r.width;
        const scaleY = canvas.height / r.height;
        const x = (e.clientX - r.left) * scaleX;
        const y = (e.clientY - r.top) * scaleY;

        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = this.props.boxes.length - 1, b; b = this.props.boxes[i]; i--) {
          const [bx, by, bw, bh] = b;

          if(x >= bx && x <= bx + bw &&
             y >= by && y <= by + bh) {
              // The mouse honestly hits the rect
              this.setState({hoverIndex: i + 1});
              break;
          }
        }
        // Draw the rectangles by Z (ASC)
        this.renderBoxes(ctx);
      });

    });
  }

  componentDidMount() {
    this.createCanvas();
  }

  componentDidUpdate() {
    if(this.state.currentImg != this.props.item.img) {
      this.setState({
        currentImg: this.props.item.img
      });

      const item = this.props.item;
      const densemap = this.props.densemap;

      let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.createCanvas();
    }
  }

  render() {
    return (<div>
      <canvas ref="canvasImage" />
    </div>);
  }

}
export default CanvasImage;
