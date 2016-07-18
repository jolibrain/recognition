import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import styles from './styles.js';

@Radium
class HtmlImage extends React.Component {

  render() {

    console.log('HtmlImage');

    return (<div>
      <img className="img-responsive" src={this.props.img} />
    </div>);
  }

}

export default HtmlImage;
