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

class SubscribeModal extends React.Component {

  state = { showModal: false }

  render() {

    const linkStyle = {
      color: 'rgb(255, 255, 255)',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      marginLeft: '20px',
      ':hover': {
        color: '#0FC'
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

    return (
      <Link to='#' style={linkStyle}
         onClick={() => {
          this.setState({ showModal: true });
        }}>
        Subscribe
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
            <h4 id='modal-label'>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </div>
        </Modal>
      </Link>
    );
  }

  close(){
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }
}

export default SubscribeModal;
