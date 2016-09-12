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
import Splash from '../Splash';
import GalleryItem from '../GalleryItem';
import InfiniteScroll from 'react-infinite-scroller';
import GoogleTagManager from '../GoogleTagManager';

class Gallery extends React.Component {
  static state={
    items: [],
    hasMoreItems: true,
    offset: 3
  };

  constructor(props) {
    super(props);

    const offset = 3;

    this.state = Gallery.state;

    this.loadItems = this.loadItems.bind(this);
  }

  componentWillReceiveProps() {
    if(this.state.items.length == 0) this.loadItems();
  }

  componentDidUpdate() {
    if(this.state.items.length == 0) this.loadItems();
  }

  loadItems() {
    const newOffset = this.state.items.length + this.state.offset;

    this.setState({
      items: this.props.matches.slice(0, newOffset),
      hasMoreItems: newOffset < this.props.matches.length
    });

    Gallery.state=this.state;
  }

  renderItems() {
    const items = this.state.items.length == 0 ? this.props.matches.slice(0, this.state.offset) : this.state.items;
    return items.map((item, key) => (<GalleryItem key={key} item={item}/>));
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;
    const items = this.renderItems();

    let gtm = null;
    if(!this.props.disableGTM) {
      gtm = <GoogleTagManager dataLayerName='Gallery' />
    }

    if(items.length == 0) return null;

    return (<div>{gtm}
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems}
        hasMore={this.state.hasMoreItems}
        loader={loader}>

        <div className="container-fluid gallery" id="gallery">
          {items}
        </div>

      </InfiniteScroll>
    </div>);
  }
}

export default Gallery;
