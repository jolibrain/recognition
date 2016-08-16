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

    console.log(selectedOutput);

    const rx = /reuters\/(.*)\.jpg/g;
    const arr = rx.exec(item.input.img);
    const itemId = arr[1];

    return(<div className="container-fluid">
      <div className="row" style={styles.rowImg}>

        <div className="col-md-5 col-md-offset-1"style={[styles.leftImg]} >
          <BoundedImage item={item.input} features={selectedOutput.features.in}/>
        </div>
        <div className="col-md-5 col-md-offset-1">
          <BoundedImage item={selectedOutput} features={selectedOutput.features.out}/>
        </div>

      </div>
      <div className="row" style={styles.dataRow}>

        <div className="col-md-6">
          <Link style={[styles.link]} to={`/gallery/${itemId}`}><span className='icon--i_arrow-left'/> Back to article</Link>
          <DetailFeatures item={item.input} source={'reuters'} features={selectedOutput.features.in} scores={selectedOutput.features.summary.scores}/>
        </div>

        <div className="col-md-6" style={[styles.rightDetails]}>
          <DetailFeatures item={selectedOutput} source={'tate'} features={selectedOutput.features.out} scores={selectedOutput.features.summary.scores}/>
        </div>

      </div>

    </div>);
  }
}

export default Detail;
