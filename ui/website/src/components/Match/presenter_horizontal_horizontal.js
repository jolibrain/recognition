import React from 'react';
import Radium from 'radium';
import styles from './styles.js';
import { browserHistory } from 'react-router'

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Match extends React.Component {

  render() {

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    return (<div>
      <div className="container-fluid">
        <div class="row">

          <div className="col-md-5">
            <div>
              <span key="item.input.meta.date" style={styles.input.date}>
                {item.input.meta.date}
              </span>
              <br/>
              <span key="item.input.meta.title" style={styles.input.title}>
                {item.input.meta.title}</span>
              <br/>
              <span key="item.input.meta.origin" style={styles.input.method}>{item.input.meta.method}</span>
            </div>

            <div>
              <span key="item.output.meta.date" style={styles.output.date}>
                {selectedOutput.meta.date}
              </span>
              <br/>
              <span key="item.output.meta.title" style={styles.output.title}>
                {selectedOutput.meta.title}
              </span>&nbsp;
              <span key="item.output.meta.author" style={styles.output.author}>
                by {selectedOutput.meta.author}
              </span>
              <br/>
              <span key="item.output.meta.origin" style={styles.output.method}>{selectedOutput.meta.method}</span>
            </div>

            <img className="img-responsive" src={item.input.img} />
            <p style={styles.imgDescription}>{item.input.meta.origin}</p>

          </div>

          <div className="col-md-5">

            <img className="img-responsive" src={selectedOutput.img} />
            <p style={styles.imgDescription}>{selectedOutput.meta.origin}</p>

          </div>

          <div className="col-md-2">

            <Link to={`/details/${item.id}`}>View recognition process</Link>

            <p>{selectedOutput.features.out.description}</p>

            <Link to={`/details/${item.id}`}>Share</Link>
          </div>

        </div>
      </div>
    </div>);
  }
}

export default Match;

