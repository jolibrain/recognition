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
      <Link className="font-subtext matchLinkRecog" style={styles.processLink} to={`/details/${this.props.id}`}>View Data <span className="icon--i_arrow-right"/></Link>

      <h3 className="font-data" style={styles.descriptionTitle}>AI Statement</h3>
      <p className="font-data" style={styles.descriptionText}>{this.props.descriptionIn}</p>
      <p className="font-data" style={[styles.descriptionText, {marginBottom: '32px'}]}>{this.props.descriptionOut}</p>

      <ShareModal url={"http://recognition.tate.org.uk/gallery/" + this.props.id} />
    </div>);
  }
}

export default Description;

