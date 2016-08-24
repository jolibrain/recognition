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
    hoverHash: [],
    hoverIndex: -1
  };

  renderBox(index, box) {

    let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
    let ctx = canvas.getContext('2d');

    const item = this.props.item;
    let [x, y, width, height] = box;

    let duplicates = false;
    if(this.props.overHash && this.props.overHash.hash.length > 0) {
      const mergedBoxids = this.props.boxids[index].concat(this.props.overHash.hash);
      duplicates  = mergedBoxids.reduce(function(acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
          acc.push(el);
          return acc;
        }, []).length > 0;
    }

    // choose box color, depending on hover status
    let colorStyle = 'rgba(225,255,255,1)';
    if( typeof this.props.overHash.index != 'undefined' &&
        this.props.overHash.index == index) {
      colorStyle = 'rgba(0,225,204,1)';
    } else if(duplicates) {
      colorStyle = 'rgba(0,225,204,1)';
    }

    let lineWidth = 1;
    if(canvas.width > 600)
      lineWidth = 2;
    if(canvas.width > 1000)
      lineWidth = 4;

    if(x < lineWidth / 2)
      x = lineWidth / 2;
    if(y < lineWidth / 2)
      y = lineWidth / 2;

    if((x + width) > (item.meta.width + lineWidth / 2))
      width = item.meta.width + lineWidth / 2 - x;
    if((y + height) > (item.meta.height + lineWidth / 2))
      height = item.meta.height + lineWidth / 2 - y;

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

    /* DEBUG */
  /*
    ctx.font = "30px Arial";
    ctx.fillStyle = 'rgba(225,0,0,1)';
    ctx.fillText(this.props.boxids[index].map(i => i.slice(0, 2)).join(','), x,y+height);
    ctx.fillStyle = 'rgba(0,0,225,1)';
    ctx.fillText(index,x+width,y);
    */
  }

  renderBoxes() {
    this.props.boxes.forEach((box, i) => this.renderBox(i, box));
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

      const gradientWidth = item.meta.width * 0.3;
      ctx.beginPath();
      // put stroke color to transparent
      ctx.strokeStyle = "transparent"
      // draw rectablge towards right hand side
      ctx.rect(0,0,gradientWidth,item.meta.height);
      // create linear gradient
      let grdLinear = ctx.createLinearGradient(0, 0, gradientWidth, 0);
      // Important bit here is to use rgba()
      grdLinear.addColorStop(0, "rgba(0, 0, 0, 0.85)");
      grdLinear.addColorStop(1, 'rgba(0, 0, 0, 0)');
      // add gradient to rectangle
      ctx.fillStyle = grdLinear;
      // step below are pretty much standard to finish drawing an object to canvas
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      this.renderBoxes()

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
        this.props.onOver(this.props.parent, this.state.hoverHash, this.state.hoverIndex, true);
        this.renderBoxes();
      });

      canvas.onmouseout = ((e) => {
        this.setState({hoverIndex: -1, hoverHash: []});
        this.props.onOver(this.props.parent, this.state.hoverHash, this.state.hoverIndex, false);
        this.renderBoxes();
      });

    });
  }

  componentWillReceiveProps() {
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
    /* DEBUG
      <p>hash {this.props.overHash.hash} - index {this.props.overHash.index}</p>
      */
    return (<div>
      <canvas ref="canvasImage"/>
    </div>);
  }

}
export default CanvasImage;
