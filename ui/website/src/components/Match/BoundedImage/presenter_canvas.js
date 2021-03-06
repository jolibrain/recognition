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
    this.props.boxes.filter((box, index) => {

      let duplicates = false;
      if(this.props.overHash && this.props.overHash.hash.length > 0) {
        const mergedBoxids = this.props.boxids[index].concat(this.props.overHash.hash);
        duplicates  = mergedBoxids.reduce(function(acc, el, i, arr) {
          if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
            acc.push(el);
            return acc;
          }, []).length > 0;
      }

      return duplicates || this.props.overHash.index == index;

    }).forEach((box, i) => this.renderBox(i, box));
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

      canvas.onclick = ((e) => browserHistory.push(`/details/${this.props.itemId}`));

      canvas.onmousemove = ((e) => {

        this.setState({hoverIndex: -1, hoverHash: []});

        // Get the current mouse position
        const r = canvas.getBoundingClientRect();
        const scaleX = canvas.width / r.width;
        const scaleY = canvas.height / r.height;
        const x = (e.clientX - r.left) * scaleX;
        const y = (e.clientY - r.top) * scaleY;

        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        let selectedBox = {index: -1, dimensions: null};
        for(var i = this.props.boxes.length - 1, b; b = this.props.boxes[i]; i--) {
          const [bx, by, bw, bh] = b;

          if(x >= bx && x <= bx + bw &&
             y >= by && y <= by + bh) {
              // The mouse honestly hits the rect
              const insideBox = !selectedBox.dimensions || (
                bx >= selectedBox.dimensions[0] &&
                bx <= selectedBox.dimensions[0] + selectedBox.dimensions[2] &&
                by >= selectedBox.dimensions[1] &&
                by <= selectedBox.dimensions[1] + selectedBox.dimensions[3]
              );
              if(insideBox) {
                selectedBox.index = i;
                selectedBox.dimensions = b;
              }
          }
        }

        if(selectedBox.index != -1)
          this.setState({
            hoverIndex: selectedBox.index,
            hoverHash: this.props.boxids[selectedBox.index]
          });

        // Draw the rectangles by Z (ASC)
        this.props.onOver(this.props.parent, this.state.hoverHash, this.state.hoverIndex);
        this.renderBoxes();
      });

      canvas.onmouseout = ((e) => {
        this.setState({hoverIndex: -1, hoverHash: []});
        this.props.onOver(this.props.parent, this.state.hoverHash, this.state.hoverIndex);
        this.renderBoxes();
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

  shouldComponentUpdate(nextProps, nextState) {
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
