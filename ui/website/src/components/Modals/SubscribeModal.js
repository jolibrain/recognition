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
import styles from './SubscribeStyles.js';

@Radium
class SubscribeModal extends React.Component {

  state = { showModal: false }

  render() {

    return (<div className="subscribeModal" style={styles.component}>
      <a style={styles.link}
         onClick={() => {
          this.setState({ showModal: true });
        }}>
        Subscribe
      </a>

      <Modal
        aria-labelledby='modal-label'
        style={styles.modal}
        backdropStyle={styles.backdrop}
        show={this.state.showModal}
        onHide={() => {
          this.setState({ showModal: false });
        }}
      >
        <div>
          <div style={styles.dialog} className="hidden-xs">
            <h4 id='modal-label' style={styles.title}>Subscribe</h4>
            <p style={styles.text}>Keep up to date with RECOGNITION</p>

            <form class="form__newsletter-signup" action="http://links.mkt41.net/servlet/UserSignUp?f=717648&amp;postMethod=HTML&amp;m=0&amp;j=MAS2" method="post">
              <input type="hidden" value="T" name="EMAIL_REQUIRED"/>
              <input type="hidden" value="email" name="EMAIL_DATATYPE"/>
              <input type="hidden" value="Yes" name="EB_EXHIBITIONS"/>
              <input type="hidden" value="Tate home page E-Bulletin sign-up" name="Source"/>
              <fieldset>
                <label for="email">Email address</label>
                <br/>
                <input type="email" name="email" id="email" placeholder="" style={styles.input}/>
                <button type="submit" style={styles.button}>Ok</button>
              </fieldset>
            </form>
          </div>
          <div style={styles.dialogXs} className="visible-xs">
            <h4 id='modal-label' style={styles.titleXs}>Subscribe</h4>
            <p style={styles.textXs}>Keep up to date with RECOGNITION</p>

            <form class="form__newsletter-signup" action="http://links.mkt41.net/servlet/UserSignUp?f=717648&amp;postMethod=HTML&amp;m=0&amp;j=MAS2" method="post">
              <input type="hidden" value="T" name="EMAIL_REQUIRED"/>
              <input type="hidden" value="email" name="EMAIL_DATATYPE"/>
              <input type="hidden" value="Yes" name="EB_EXHIBITIONS"/>
              <input type="hidden" value="Tate home page E-Bulletin sign-up" name="Source"/>
              <fieldset>
                <label for="email">Email address</label>
                <br/>
                <input type="email" name="email" id="email" placeholder="" style={styles.input}/>
                <button type="submit" style={styles.button}>Ok</button>
              </fieldset>
            </form>
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

export default SubscribeModal;
