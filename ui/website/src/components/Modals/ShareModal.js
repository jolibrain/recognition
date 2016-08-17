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

let {Link} = require('react-router');
Link = Radium(Link);

class ShareModal extends React.Component {

  state = { showModal: false }

  render() {

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
      border: '1px solid #e5e5e5',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,.5)',
      padding: 20,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)'
    };

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
        <div style={dialogStyle} >
          <h4 id='modal-label'>Subscribe</h4>
          <p>Keep up to date with RECOGNITION</p>

          <form class="form__newsletter-signup" action="http://links.mkt41.net/servlet/UserSignUp?f=717648&amp;postMethod=HTML&amp;m=0&amp;j=MAS2" method="post">
            <input type="hidden" value="T" name="EMAIL_REQUIRED"/>
            <input type="hidden" value="email" name="EMAIL_DATATYPE"/>
            <input type="hidden" value="Yes" name="EB_EXHIBITIONS"/>
            <input type="hidden" value="Tate home page E-Bulletin sign-up" name="Source"/>
            <fieldset>
              <label for="email">Email address</label>
              <input type="email" name="email" id="email" placeholder="Email address"/>
              <button type="submit">Ok</button>
            </fieldset>
          </form>

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
