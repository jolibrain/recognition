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
import base64 from 'base-64';

const STATUS_PENDING = "pending";
const STATUS_PUBLISH = "published";
const STATUS_MODERATE = "moderated";

class GalleryItem extends React.Component {

  constructor(props) {
    super(props);

    const offset = 3;

    this.state = {
      status: ''
    }

    this.handlePendingClick = this.handlePendingClick.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
    this.handleModerateClick = this.handleModerateClick.bind(this);
    this.handleStatusClick = this.handleStatusClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      date: this.props.match.input.meta.date,
      img_in: this.props.match.input.img,
      img_out: this.props.match.output.filter(item => item.selected)[0].img,
      status: this.props.match.status
    });
  }

  handlePendingClick() {
    this.handleStatusClick(STATUS_PENDING);
  }

  handlePublishClick() {
    this.handleStatusClick(STATUS_PUBLISH);
  }

  handleModerateClick() {
    this.handleStatusClick(STATUS_MODERATE);
  }

  handleStatusClick(status) {
    this.setState({status: status});
    fetch('/api/moderation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode("recog:trocEipayb")
      },
      body: JSON.stringify({
        img_in: this.state.img_in,
        img_out: this.state.img_out,
        status: status
      })
    })
  }

  render() {

    return (
      <div className="row" style={{
        "borderBottom": "1px solid #666",
        "paddingBottom": "20px",
        "marginBottom": "20px"
      }}>

        <div className="col-md-9">

          <h4>{this.state.date}</h4>
          <div className="row" style={{
            "marginBottom": "20px"
          }}>
            <div className="col-md-6">
              <figure className="figure">
                <img src={this.state.img_in} className="img-responsive"/>
              </figure>
            </div>
            <div className="col-md-6">
              <figure className="figure">
                <img src={this.state.img_out} className="img-responsive"/>
              </figure>
            </div>
          </div>

        </div>

        <div className="col-md-3">
          <div className="btn-group-vertical btn-group-lg" role="group">
            <button onClick={this.handlePendingClick} type="button" className={this.state.status == STATUS_PENDING ? "btn btn-default active" : "btn btn-default"}>Pending</button>
            <button onClick={this.handlePublishClick} type="button" className={this.state.status == STATUS_PUBLISH ? "btn btn-default active" : "btn btn-default"}>Publish</button>
            <button onClick={this.handleModerateClick} type="button" className={this.state.status == STATUS_MODERATE ? "btn btn-default active" : "btn btn-default"}>Moderate</button>
          </div>
        </div>

      </div>
    );
  }
}

export default GalleryItem;
