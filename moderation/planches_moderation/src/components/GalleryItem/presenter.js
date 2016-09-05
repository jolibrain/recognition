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
import config from "config";

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
      in: this.props.match.input,
      out: this.props.match.output.filter(item => item.selected)[0],
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

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + new Buffer(config.get("login") + ":" + config.get("password")).toString('base64'));

    fetch('/moderation', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        img_in: this.state.in.img,
        img_out: this.state.out.img,
        status: status
      })
    })
  }

  render() {

    const author_in = Array.isArray(this.state.in.meta.author) ? this.state.in.meta.author[0] : this.state.in.meta.author;
    const author_out = Array.isArray(this.state.out.meta.author) ? this.state.out.meta.author[0] : this.state.out.meta.author;

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
                <img src={this.state.in.img} className="img-responsive"/>
              </figure>
              <p>{this.state.in.meta.date}<br/>
              {this.state.in.meta.title}<br/>
              { typeof author_in != 'undefined' && author_in.length > 0 ? (<span>AUTHOR: {author_in}<br/></span>) : ''}<br/>
              {this.state.in.meta.copyright}</p>
              <p>AI: {this.state.out.features.in.captions.caption}</p>
            </div>
            <div className="col-md-6">
              <figure className="figure">
                <img src={this.state.out.img} className="img-responsive"/>
              </figure>
              <p>{this.state.out.meta.date}<br/>
              {this.state.out.meta.title}<br/>
              { typeof author_out != 'undefined' && author_out.length > 0 ? (<span>AUTHOR: {author_out}<br/></span>) : ''}<br/>
              {this.state.out.meta.copyright}</p>
              <p>AI: {this.state.out.features.out.captions.caption}</p>
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
