import React from 'react';
import Radium from 'radium';
import JSONPretty from 'react-json-pretty';
import styles from './styles.js';

@Radium
class DetailFeatures extends React.Component {

  render() {

    if(!this.props.item || !this.props.features) return null;

    const item = this.props.item;
    const features = this.props.features;

    return(<div>
      <JSONPretty id="json-pretty" json={item.meta} style={styles.json}></JSONPretty>
      <JSONPretty id="json-pretty" json={features} style={styles.json}></JSONPretty>
    </div>);
  }
}

export default DetailFeatures;
