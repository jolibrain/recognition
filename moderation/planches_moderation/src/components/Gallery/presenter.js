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
import {Link} from 'react-router';
import GalleryItem from '../GalleryItem';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      matchFilter: 'all'
    }

    this.handleFilterAllClick = this.handleFilterAllClick.bind(this);
    this.handleFilterPreClick = this.handleFilterPreClick.bind(this);
    this.handleFilterPostClick = this.handleFilterPostClick.bind(this);

    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  componentWillMount() {
    this.setState({matches: this.props.matches});
  }

  handleFilterAllClick() {
    this.handleFilterClick('all');
  }

  handleFilterPreClick() {
    this.handleFilterClick('pending');
  }

  handleFilterPostClick() {
    this.handleFilterClick('published');
  }

  handleFilterClick(filter) {
    this.setState({matchFilter: filter});
  }

  render() {

    console.log(this.state);

    if(this.state.matches.length == 0) return null;

    return (<div className="container">
      {
        this.state.matches.filter(item => {
          return this.state.matchFilter == 'all' || item.status == this.state.matchFilter;
        }).map((match, key) => {
          return <GalleryItem key={key} match={match} filter={this.state.matchFilter} />;
        })
      }
    </div>);
  }

}

export default Gallery;
