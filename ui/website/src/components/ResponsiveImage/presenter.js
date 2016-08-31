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
import { browserHistory } from 'react-router';
import BoundedImage from './BoundedImage';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class ResponsiveImage extends React.Component {

  state = {displayOverlay: false};

  render() {

    if(!this.props.item) return null;
    const source = this.props.params.source;

    let selectedOutput = this.props.item;
    if(source == "tate") {
      selectedOutput = selectedOutput.output.filter(item => item.selected)[0];
    }

    return (<div className="container responsiveImage">
      <div className="row">
        <div className="col-xs-2">
          <a className="back" onClick={browserHistory.goBack}><span className='icon--i_arrow-left'/></a>
        </div>
        <div className="col-xs-10 text-right">
          <a className="processOverlay" onClick={() => this.setState({displayOverlay: !this.state.displayOverlay})}>VIEW RECOGNITION OVERLAY</a>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 text-center">
          <BoundedImage
            item={selectedOutput}
            features={source === "reuters" ? selectedOutput.features.in : selectedOutput.features.out}
            displayOverlay={this.state.displayOverlay}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 font-titles info">
          { source === 'reuters' ?
          (<div>
            <p>{moment(selectedOutput.meta.date).format('DD/MM/YYYY')}<br/>
            {selectedOutput.meta.caption}<br/>
            REUTERS/{selectedOutput.meta.author}</p>
          </div>) :
          (<div>
            <p>{selectedOutput.meta.date}<br/>
            {selectedOutput.meta.title}<br/>
            {selectedOutput.meta.copyright}</p>
          </div>)}
        </div>
      </div>
    </div>);
  }
}

export default ResponsiveImage;
