import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import styles from './styles.js';
import { browserHistory } from 'react-router'
import DetailData from './presenter_data'
import DetailFeatures from './presenter_features'

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Detail extends React.Component {

  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    return(<div className="container-fluid">
      <div className="row" style={styles.rowImg}>

        <div className="col-md-5 col-md-offset-1">
          <svg width={item.input.meta.width + 'px'} height={item.input.meta.height + 'px'}>
            <image width={item.input.meta.width + 'px'} height={item.input.meta.height + 'px'} x='0' y='0' xlinkHref={item.input.img}/>
            <g>
                  <rect
                    key={'box--1'}
                    x='10'
                    y='30'
                    width='10'
                    height='10'
                    stroke='#F00'
                    fill='none' strokeWidth='2'
                  />
            {
              selectedOutput.features.in.densecap.scores.map((score, index) => {
                const box = selectedOutput.features.in.densecap.boxes[index];
                return (
                  <rect
                    key={'box-' + index}
                    x={box[0]}
                    y={box[1]}
                    width={box[2]}
                    height={box[3]}
                    stroke={'#F00'}
                    fill='none' strokeWidth='2'
                  />
                );
              })
            }
            </g>
          </svg>
        </div>
        <div className="col-md-5 col-md-offset-1">
          <img className="img-responsive" src={selectedOutput.img} />
        </div>

      </div>
      <div className="row" style={styles.dataRow}>

        <div className="col-md-6">
          <Link to={`/gallery/${item.id}`}>Back to article</Link>
          <DetailFeatures item={item.input} features={selectedOutput.features.in}/>
        </div>

        <div className="col-md-6">
          <DetailFeatures item={selectedOutput} features={selectedOutput.features.out}/>
        </div>

      </div>

    </div>);
  }
}

export default Detail;
