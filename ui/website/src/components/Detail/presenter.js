import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import styles from './styles.js';
import { browserHistory } from 'react-router'
import DetailFeatures from './presenter_features'
import BoundedImage from '../BoundedImage'

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
          <BoundedImage item={item.input} densecap={selectedOutput.features.in.densecap}/>
        </div>
        <div className="col-md-5 col-md-offset-1">
          <BoundedImage item={selectedOutput} densecap={selectedOutput.features.out.densecap}/>
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
