import React from 'react';
import Radium from 'radium';
import styles from './styles.js';
import { browserHistory } from 'react-router'

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Match extends React.Component {

  render() {

    const input = this.props.input;
    const output = this.props.output;

    return (<div>
      <div className="container-fluid">
        <div class="row">

          <div className="col-md-2">
            <div>
              <span key="item.input.meta.date" style={styles.input.date}>
                {input.meta.date}
              </span>
              <br/>
              <span key="item.input.meta.title" style={styles.input.title}>
                {input.meta.title}</span>
              <br/>
              <span key="item.input.meta.origin" style={styles.input.method}>
                {input.meta.method}
              </span>
            </div>

            <div>
              <span key="item.output.meta.date" style={styles.output.date}>
                {output.meta.date}
              </span>
              <br/>
              <span key="item.output.meta.title" style={styles.output.title}>
                {output.meta.title}
              </span>&nbsp;
              <span key="item.output.meta.author" style={styles.output.author}>
                by {output.meta.author}
              </span>
              <br/>
              <span key="item.output.meta.origin" style={styles.output.method}>
                {output.meta.method}
              </span>
            </div>

            <Link to={`/details/${this.props.itemId}`}>View recognition process</Link>

            <p>{output.features.out.description}</p>

            <Link to={`/details/${this.props.itemId}`}>Share</Link>

          </div>

          <div className="col-md-5">

            <img className="img-responsive" src={input.img} />
            <p style={styles.imgDescription}>{input.meta.origin}</p>

          </div>

          <div className="col-md-5">

            <img className="img-responsive" src={output.img} />
            <p style={styles.imgDescription}>{output.meta.origin}</p>

          </div>

        </div>
      </div>
    </div>);
  }
}

export default Match;

