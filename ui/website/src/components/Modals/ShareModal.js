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

import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

let {Link} = require('react-router');
Link = Radium(Link);

class ShareModal extends React.Component {

  state = { showModal: false }

  render() {

    const {
      FacebookShareButton,
      TwitterShareButton,
      PinterestShareButton,
      GooglePlusShareButton
    } = ShareButtons;

    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');
    const PinterestIcon = generateShareIcon('pinterest');
    const GooglePlusIcon = generateShareIcon('google');

    const linkStyle = {
      color: 'rgb(255, 255, 255)',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      padding: '4px 4px 3px 4px',
      border: '1px solid',
      textDecoration: 'none',
      cursor: 'pointer',
      ':hover': {
        color: '#0FC',
        borderColor: '#FFF'
      }
    };

    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0
    };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    const dialogStyle =  {
      position: 'absolute',
      width: 400,
      backgroundColor: '#0d1215',
      border: '1px solid #4a4a4a',
      boxShadow: '0 5px 15px rgba(0,0,0,.5)',
      padding: 10,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      outline: 'none'
    };

    const titleStyle = {
      color: '#FFF',
      fontFamily: 'TateNewPro-Thin',
      fontSize: '24px',
      margin: 0
    };

    const textStyle = {
      color: '#AAA',
      fontFamily: 'TateNewPro',
      fontSize: '18px'
    };

    const url = encodeURI(this.props.url || "http://recognition.tate.org.uk");
    const text = encodeURI(this.props.text || "RECOGNITION");

    return (<div className="shareModal">
      <a style={linkStyle}
         onClick={() => {
          this.setState({ showModal: true });
        }}>
        <img src='/img/icons/share.png'/> Share
      </a>

      <Modal
        aria-labelledby='modal-label'
        style={modalStyle}
        backdropStyle={backdropStyle}
        show={this.state.showModal}
        onHide={() => {
          this.setState({ showModal: false });
        }}
      >
        <div style={dialogStyle}>
          <h4 id='modal-label' style={titleStyle}>share</h4>
          <p style={textStyle}>what makes this an interesting match?<br/>
          could you write a better caption thant the AI?</p>

          <div className="fluid-container">
            <div className="row">
              <div className="col-md-3">

                <FacebookShareButton
                  url={url}
                  title={text}
                  className="share-button">
                  <FacebookIcon
                    logoFillColor="white"
                    size={32}
                    iconBgStyle={{fillOpacity: 0}}
                  />
                </FacebookShareButton>

              </div>
              <div className="col-md-3">

                <TwitterShareButton
                  url={url}
                  title={text}
                  className="share-button">
                  <TwitterIcon
                    logoFillColor="white"
                    size={32}
                    iconBgStyle={{fillOpacity: 0}}
                  />
                </TwitterShareButton>

              </div>
              <div className="col-md-3">

                <PinterestShareButton
                  url={url}
                  title={text}
                  className="share-button">
                  <PinterestIcon
                    logoFillColor="white"
                    size={32}
                    iconBgStyle={{fillOpacity: 0}}
                  />
                </PinterestShareButton>

              </div>
              <div className="col-md-3">

                <GooglePlusShareButton
                  url={url}
                  title={text}
                  className="share-button">
                  <GooglePlusIcon
                    logoFillColor="white"
                    size={32}
                    iconBgStyle={{fillOpacity: 0}}
                  />
                </GooglePlusShareButton>

              </div>
            </div>

          </div>
        </div>
      </Modal>
    </div>);
  }

  close(){
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }
}

export default ShareModal;
