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
import {Modal} from 'react-overlays';

class ImageOverlay extends React.Component {

  render() {

    if(this.props.show) {
      document.getElementsByTagName("nav")[0].classList.toggle('hidden', true);
    } else {
      document.getElementsByTagName("nav")[0].classList.remove('hidden');
    }

    const modalStyle = {
      zIndex: 1040
    };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    const dialogStyle =  {
      position: 'absolute',
      width: '100%',
      height: '100%',
      padding: 10,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)'
    };

    return (<Modal show={this.props.show}
                   onHide={this.props.onHide}
                   style={modalStyle}
                   backdropStyle={backdropStyle}
                container={this.props.container}
                placement={this.props.placement}
                target={props => findDOMNode(this.props.target)}
      >
        <div className="imageOverlay" style={dialogStyle}>
          <div className="background"/>

          <div className="container">

            <div className="row">
              <div className="col-xs-6">
                <a onClick={this.props.onHide}><span className="icon--i_arrow-left"/></a>

              </div>
              <div className="col-xs-6">
                <p className="title">VIEW RECOGNITION OVERLAY</p>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 text-center">
                <img
                  src={this.props.img}
                  style={{width: '75%'}}
                  srcSet={this.props.img_375 + " 375w, " + this.props.img_480 + " 480w"}
                  sizes="75%"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <p>{this.props.date}<br/>
                {this.props.description}<br/>
                {this.props.source}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ImageOverlay;
