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
          <img className="img-responsive" src={item.input.img} />
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
