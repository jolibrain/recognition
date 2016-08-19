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

@Radium
class SvgImage extends React.Component {

  boxGroup(box, index) {

    const [x, y, width, height] = box;

    const poly1_points = [
      `${x + width/10},${y}`,
      `${x},${y}`,
      `${x},${y + height}`,
      `${x + width/10},${y + height}`
    ];

    const poly2_points = [
      `${x + width*9/10},${y}`,
      `${x + width},${y}`,
      `${x + width},${y + height}`,
      `${x + width*9/10},${y + height}`
    ];

    return (<g key={'group-' + index}  transform="translate(0.5,0.5)">
      <rect key={'box-rect'} fill="none"
                x={x}
                y={y}
                width={width}
                height={height} />
      <polyline key={'poly-1'} fill="none" stroke="#FFFFFF" strokeWidth="1"
        points={poly1_points.join(" ")} stroke-linejoin="miter" stroke-linecap="butt" shape-rendering="crispEdges"/>
      <polyline key={'poly-2'} fill="none" stroke="#FFFFFF" strokeWidth="1"
        points={poly2_points.join(" ")} stroke-linejoin="miter" stroke-linecap="butt" shape-rendering="crispEdges"/>
    </g>);

  }

  render() {

    const item = this.props.item;
    const densecap = this.props.densecap;

    return (<div>
      <svg width={item.meta.width + 'px'} height={item.meta.height + 'px'}>
        <image width={item.meta.width + 'px'} height={item.meta.height + 'px'} x='0' y='0' xlinkHref={item.img}/>
        { densecap.boxes.map((box, index) => this.boxGroup(box, index)) }
      </svg>
    </div>);
  }

}
export default SvgImage;
