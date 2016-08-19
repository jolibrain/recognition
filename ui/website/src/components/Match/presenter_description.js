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

import ShareModal from '../Modals/ShareModal';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Description extends React.Component {

  render() {

    return (<div>
      <Link style={styles.processLink} to={`/details/${this.props.id}`}>View recognition process <span className="icon--i_arrow-right"/></Link>

      <h3 style={styles.descriptionTitle}>AI Description</h3>
      <p style={styles.descriptionText}>{this.props.descriptionIn}</p>
      <p style={styles.descriptionText}>{this.props.descriptionOut}</p>

      <ShareModal />
    </div>);
  }
}

export default Description;

