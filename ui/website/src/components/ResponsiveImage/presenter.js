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
import moment from 'moment';
import Swipeable from 'react-swipeable';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class ResponsiveImage extends React.Component {

  constructor(props) {
    super(props);

    const offset = 3;

    this.state = {
      displayOverlay: false,
      source: '',
      itemId: null
    }

    this.handleCanvasClick = this.handleCanvasClick.bind(this);
    this.handleLeftSwipe = this.handleLeftSwipe.bind(this);
    this.handleRightSwipe = this.handleRightSwipe.bind(this);
  }

  handleCanvasClick() {
    this.setState({displayOverlay: !this.state.displayOverlay});
  }

  handleLeftSwipe() {
    if(this.state.source == 'tate') {
      browserHistory.push(`/image/reuters/${this.state.itemId}`);
    }
  }

  handleRightSwipe() {
    if(this.state.source == 'reuters') {
      browserHistory.push(`/image/tate/${this.state.itemId}`);
    }
  }

  componentWillMount() {
    this.setState({
      source: this.props.params.source,
      itemId: this.props.itemId
    });
  }

  render() {

    if(!this.props.item) return null;

    const rx = /Z_\d+_(.*?)_/g;
    const arr = rx.exec(this.props.item.input.img);
    const itemId = arr[1];

    let item = null;
    let features = null;
    if(this.state.source == "tate") {
      item = this.props.item.output.filter(item => item.selected)[0];
      features = item.features.out;
    } else {
      item = this.props.item.input;
      features = this.props.item.output.filter(item => item.selected)[0].features.in;
    }

    return (<div>
      <nav style={{background: '#0d1215', border: 0}} className="navbar navbar-default navbar-fixed-top visible-xs">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to='/gallery'>
              <img src="/img/logos/recognition.png" alt="recognition"/>
            </Link>
            <p className="text-right" style={{padding: '15px'}}>
              <Link className="navbar-link" to={`/gallery/${itemId}`}>
                <img src="/img/icons/close.png" alt="close"/>
              </Link>
            </p>
          </div>
        </div>
      </nav>

      <Swipeable
        onSwipingLeft={() => {
          if(this.props.source == 'reuters') {
            browserHistory.push(`/image/tate/${itemId}`)
          }
        }}
        onSwipingRight={() => {
          if(this.props.source == 'tate') {
            browserHistory.push(`/image/reuters/${itemId}`)
          }
        }}
      >
        <div className="container responsiveImage">
          <div className="row">
            { this.state.source === "reuters" ? (<div>
              <div className="col-xs-10">
                <a className="processOverlay" onClick={() => this.setState({displayOverlay: !this.state.displayOverlay})}>{this.state.displayOverlay ? "HIDE" : "VIEW" } RECOGNITION OVERLAY</a>
              </div>
              <div className="col-xs-2 text-right">
                <Link className="back" to={`/image/tate/${itemId}`}><span className='icon--i_arrow-right'/></Link>
              </div>
            </div>) : (<div>
              <div className="col-xs-2">
                <Link className="back" to={`/image/reuters/${itemId}`}><span className='icon--i_arrow-left'/></Link>
              </div>
              <div className="col-xs-10 text-right">
                <a className="processOverlay" onClick={() => this.setState({displayOverlay: !this.state.displayOverlay})}>{this.state.displayOverlay ? "HIDE" : "VIEW" } RECOGNITION OVERLAY</a>
              </div>
            </div>)}

          </div>

          <div className="row">
            <div className="col-xs-12 text-center" style={{marginTop: '16px'}}>
              <BoundedImage
                item={item}
                features={features}
                displayOverlay={this.state.displayOverlay}
                parent={this}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 font-titles info">
              { this.state.source === 'reuters' ?
              (<div>
                <p>{moment(item.meta.date).format('DD/MM/YYYY')}<br/>
                {item.meta.caption}<br/>
                REUTERS/{item.meta.author}</p>
              </div>) :
              (<div>
                <p>{item.meta.date}<br/>
                {item.meta.title}<br/>
                {item.meta.copyright}</p>
              </div>)}
            </div>
          </div>
        </div>
      </Swipeable>
    </div>);
  }
}

export default ResponsiveImage;
