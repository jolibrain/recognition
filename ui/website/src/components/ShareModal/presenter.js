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
import styles from './styles.js';
import { Modal, ModalBody } from 'react-bootstrap';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class ShareModal extends React.Component {

  state = { showModal: false };

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {

    return (
      <div>

        <button
          onClick={this.open}
        >
          Share
        </button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <p>test</p>
          </Modal.Body>
        </Modal>
      </div>
    );

  }
}

export default ShareModal;
