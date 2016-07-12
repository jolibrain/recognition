import React from 'react';
import Radium from 'radium';
import styles from './styles.js';

@Radium
class DetailData extends React.Component {

  render() {

    if(!this.props.item || !this.props.features) return null;

    const item = this.props.item;
    const features = this.props.features;

    return(<div>
      <div className="table-responsive">
        <table className="table borderless">
          <tbody>
            <tr><td>DATE:</td><td>{item.meta.date}</td></tr>
            <tr><td>TITLE:</td><td>{item.meta.title}</td></tr>
            <tr><td>AUTHOR:</td><td>{item.meta.author}</td></tr>
            <tr><td>SOURCE:</td><td>{item.meta.source}</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Description</h3>
      <p>{item.meta.description}</p>

      <hr/>

      <h3>Subject</h3>
      <p>Face detected: {features.faces.length}</p>

      <div className="table-responsive">
        <table className="table borderless">
          <tbody>
      {
        features.faces.map((face, index) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>AGE<br/>GENDER</td>
              <td>{face.age}<br/>{face.gender}</td>
            </tr>
          );
        })
      }
          </tbody>
        </table>
      </div>

      <h3>Expression</h3>

      <div className="table-responsive">
        <table className="table borderless">
          <tbody>
      {
        features.expressions.map((expression, key) => {
          return (
            <tr key={key}>
              <td>{expression.value}</td>
              <td>{expression.score}</td>
            </tr>
          );
        })
      }
          </tbody>
        </table>
      </div>

      <h3>Color</h3>

      <div className="table-responsive">
        <table className="table borderless">
          <tbody>
      {
        features.colors.map((color, key) => {
          return (
            <tr key={key}>
              <td>{color.name}</td>
              <td>{color.value}</td>
            </tr>
          );
        })
      }
          </tbody>
        </table>
      </div>

      <h3>Tags</h3>
      <p>{item.meta.tags}</p>
    </div>);
  }
}

export default DetailData;
