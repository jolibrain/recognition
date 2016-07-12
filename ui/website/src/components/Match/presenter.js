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

    if(item.input.meta.orientation && selectedOutput.meta.orientation) {

      switch (item.input.meta.orientation) {

        case "horizontal":
          switch (selectedOutput.meta.orientation) {
            case "horizontal":
              return <MatchHH item={item}/>
            break;
            case "vertical":
              return <MatchHV item={item}/>
            break;
          }
        break;

        case "vertical":
          switch (selectedOutput.meta.orientation) {
            case "horizontal":
              return <MatchVH item={item}/>
            break;
            case "vertical":
              return <MatchVV item={item}/>
            break;
          }
        break;
      }

    }

    return <MatchHH item={item}/>;
  }
}

export default Match;
