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
import BoundedImage from './BoundedImage'
import GoogleTagManager from '../GoogleTagManager';
import DocMeta from 'react-doc-meta';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Detail extends React.Component {

  state = {
    overImg: false,
    overLeft: {hash: []},
    overRight: {hash: []}
  };

  handleLeftOverFeatures(parent, overHash) {
    parent.setState({
      overLeft: {hash: overHash},
      overRight: {hash: overHash},
    });
  }

  handleRightOverFeatures(parent, overHash, overIndex) {
    parent.setState({
      overLeft: {hash: [], index: overIndex},
      overRight: {hash: overHash}
    });
  }

  handleLeftOverCanvas(parent, overHash, overIndex, overImg) {
    parent.setState({
      overImg: overImg,
      overLeft: {hash: overHash},
      overRight: {hash: overHash},
    });
  }

  handleRightOverCanvas(parent, overHash, overIndex, overImg) {
    parent.setState({
      overImg: overImg,
      overLeft: {hash: [], index: overIndex},
      overRight: {hash: overHash}
    });
  }

  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    const rx = /Z_\d+_(.*?)_/g;
    const arr = rx.exec(item.input.img);
    const itemId = arr[1];

    const meta = [
      {property: 'og:image', content: `http://recognition.tate.org.uk/img/og_image/${itemId}.jpg`}
    ];

    return(<div className="container-fluid">
      <DocMeta tags={meta} />
      <div className="row" style={styles.rowImg}>

        <div className="col-sm-5 col-sm-offset-1"style={[styles.leftImg]} >
          <BoundedImage item={item.input}
                        features={selectedOutput.features.in}
                        onOver={this.handleLeftOverCanvas}
                        overHash={this.state.overRight}
                        parent={this}
          />
        </div>
        <div className="col-sm-5 col-sm-offset-1">
          <BoundedImage item={selectedOutput}
                        features={selectedOutput.features.out}
                        onOver={this.handleRightOverCanvas}
                        overHash={this.state.overLeft}
                        parent={this}
          />
        </div>

      </div>
      <div className="row" style={styles.dataRow}>

        <div className="col-sm-6">
          <Link className="font-data" style={[styles.link]} to={`/gallery/${itemId}`}><span className='icon--i_arrow-left'/> Back to article</Link>
          <DetailFeatures item={item.input}
                          source={'reuters'}
                          features={selectedOutput.features.in}
                          scores={selectedOutput.features.summary.scores}
                          onOver={this.handleLeftOverFeatures}
                          overHash={this.state.overRight}
                          overImg={this.state.overImg}
                          parent={this}
          />
        </div>

        <div className="col-sm-6" style={[styles.rightDetails]}>
          <DetailFeatures item={selectedOutput}
                          source={'tate'}
                          features={selectedOutput.features.out}
                          scores={selectedOutput.features.summary.scores}
                          onOver={this.handleRightOverFeatures}
                          overHash={this.state.overLeft}
                          overImg={this.state.overImg}
                          parent={this}
          />
        </div>

      </div>
      <GoogleTagManager dataLayerName={'Detail_' + itemId} />
    </div>);
  }
}

export default Detail;
