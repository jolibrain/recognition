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

@Radium
class Placeholder extends React.Component {
  render() {
    return <div style={styles.uppercase} className="infoPage">
      <div className="fluid-container" style={{margin: "20px 100px"}}>
        <div className="row">
          <div className="col-xs-12">
            <p className="font-subtext infoDescription" style={{color: "#FFFFFF"}}>RECOGNITION HAS NOW BEEN TURNED OFF.</p>
              <p className="font-subtext infoDescription" style={{color: "#FFFFFF"}}>RECOGNITION WAS AN ARTIFICIAL INTELLIGENCE PROGRAM THAT COMPARED UP-TO-THE-MINUTE PHOTOJOURNALISM WITH BRITISH ART FROM THE TATE COLLECTION BETWEEN 2 SEPTEMBER AND 27 NOVEMBER 2016.</p>
              <p className="font-subtext infoDescription" style={{color: "#FFFFFF"}}>THIS WEBSITE WILL REMAIN AS AN ARCHIVE OF THE MACHINE'S FINDINGS. PLEASE RETURN SOON TO FIND MORE RSULTS FROM THIS EXPERIMENT TO SEE WHETHER MACHINE INTELLIGENCE CAN UNEARTH SIMILARITIES BETWEEN THE ART OF THE PAST AND REPRESENTATIONS OF TODAY'S WORLD.</p>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Placeholder;
