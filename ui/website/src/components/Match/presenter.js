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
