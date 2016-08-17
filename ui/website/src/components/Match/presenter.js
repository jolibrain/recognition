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

import MatchHH from './presenter_horizontal_horizontal';
import MatchHV from './presenter_horizontal_vertical';
import MatchVH from './presenter_vertical_horizontal';
import MatchVV from './presenter_vertical_vertical';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Match extends React.Component {

  state = {overHash: ''};

  handleOverHash(parent, overHash) {
    parent.setState({overHash: overHash});
  }

  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    const inputOrientation = item.input.meta.height > item.input.meta.width ?
      "vertical" : "horizontal";

    const outputOrientation = selectedOutput.meta.height > selectedOutput.meta.width ?
      "vertical" : "horizontal";

    const rx = /reuters\/(.*)\.jpg/g;
    const arr = rx.exec(item.input.img);
    const itemId = arr[1];

    switch (inputOrientation) {

      case "horizontal":
        switch (outputOrientation) {
          case "horizontal":
            return <MatchHH itemId={itemId} input={item.input} output={selectedOutput}/>
          break;
          case "vertical":
            return <MatchHV itemId={itemId} input={item.input} output={selectedOutput}/>
          break;
        }
      break;

      case "vertical":
        switch (outputOrientation) {
          case "horizontal":
            return <MatchVH itemId={itemId} input={item.input} output={selectedOutput}/>
          break;
          case "vertical":
            return <MatchVV itemId={itemId} input={item.input} output={selectedOutput}/>
          break;
        }
      break;
    }

    return <MatchHH itemId={itemId} input={item.input} output={selectedOutput}/>;
  }
}

export default Match;
