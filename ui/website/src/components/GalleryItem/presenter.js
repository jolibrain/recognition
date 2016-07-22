import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import styles from './styles.js';
import { browserHistory } from 'react-router'

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class GalleryItem extends React.Component {

  state = {hover: false};

  render() {

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    const rx = /reuters\/(.*)\.jpg/g;
    const arr = rx.exec(item.input.img);
    const itemId = arr[1];

    return(<div>
      <div className="row" style={styles.row}
        onMouseEnter={() => {
          this.setState({hover: true});
        }}
        onMouseLeave={() => {
          this.setState({hover: false});
        }}
        onClick={() => {
          browserHistory.push(`/gallery/${itemId}`);
        }}
      >

        <div className="col-md-9">

          <div className="fluid-container">
            <div className="row">
              <div className="col-md-6">
                <img className="img-responsive" src={item.input.img} />
              </div>
              <div className="col-md-6">
                <img className="img-responsive" src={selectedOutput.img} />
              </div>
            </div>
          </div>

        </div>

        <div className="col-md-3" style={styles.descriptionColumn}>

          <p>No {itemId}</p>

          <p>
            {moment(item.timestamp).format('DD/MM/YYYY')}<br/>
            {moment(item.timestamp).format('hh:mm:ss')}
          </p>

            {this.state.hover ? (
            <div>
              <span key="item.input.meta.date" style={[styles.input.date, styles.hover]}>
                {item.input.meta.date}
              </span>
              <br/>
              <span key="item.input.meta.origin" style={[styles.input.title, styles.hover]}>
                {item.input.meta.title}</span>
              <br/>
            </div>
            ) : (
            <div>
              <span key="item.input.meta.date" style={styles.input.date}>
                {item.input.meta.date}
              </span>
              <br/>
              <span key="item.input.meta.origin" style={styles.input.title}>
                {item.input.meta.title}</span>
              <br/>
            </div>
            )}
            <span key="item.input.meta.origin" style={styles.input.origin}>reuters/{item.input.meta.author}</span>

            {this.state.hover ? (
            <div>
              <span key="selectedOutput.meta.date" style={[styles.output.date, styles.hover]}>
                {selectedOutput.meta.date}
              </span>
              <br/>
              <span key="selectedOutput.meta.title" style={[styles.output.title, styles.hover]}>
                {selectedOutput.meta.title}
              </span>&nbsp;
              <span key="selectedOutput.meta.author" style={[styles.output.author, styles.hover]}>
                by {selectedOutput.meta.author}
              </span>
              <br/>
            </div>
            ) : (
            <div>
              <span key="selectedOutput.meta.date" style={styles.output.date}>
                {selectedOutput.meta.date}
              </span>
              <br/>
              <span key="selectedOutput.meta.title" style={styles.output.title}>
                {selectedOutput.meta.title}
              </span>&nbsp;
              <span key="selectedOutput.meta.author" style={styles.output.author}>
                by {selectedOutput.meta.author}
              </span>
              <br/>
            </div>
            )}
            <span style={styles.output.origin}>{selectedOutput.meta.origin}</span>

        </div>

      </div>
    </div>);
  }
}

export default GalleryItem;
