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
import Search from '../Search';
import GalleryItem from '../GalleryItem';
import InfiniteScroll from 'react-infinite-scroller';
import GoogleTagManager from '../GoogleTagManager';

class Gallery extends React.Component {
  static state={
    matches: [],
    items: [],
    hasMoreItems: true,
    offset: 3
  };

  constructor(props) {
    super(props);

    this.state = Gallery.state;

    this.loadMore = this.loadMore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matches: nextProps.displayedMatches,
      items: []
    });
    if(this.state.items.length == 0) this.loadMore();
  }

  componentDidUpdate() {
    if(this.state.items.length == 0) this.loadMore();
  }

  loadMore() {
    const newOffset = this.state.items.length + this.state.offset;

    this.setState({
      items: this.state.matches.slice(0, newOffset),
      hasMoreItems: newOffset < this.state.matches.length
    });

    Gallery.state=this.state;
  }

  render() {

    let gtm = null;
    if(!this.props.disableGTM) {
      gtm = <GoogleTagManager dataLayerName='Gallery' />
    }

    if(this.state.items.length == 0) {

      return (<div>{gtm}

        <div className="container-fluid gallery" id="gallery">

          <div className="visible-xs">
            <p style={{color: '#aaa', fontSize: '18px', fontFamily: 'TateNewPro'}}><em>Recognition</em> is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection. Scroll down to browse the gallery.</p>
          </div>

          <div className="row">
            <div className="text-center">Loading...</div>
          </div>

        </div>
      </div>);

    } else {

      return (<div>{gtm}
        <Search onSearch={this.props.onSearch} onSort={this.props.onSort}/>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.state.hasMoreItems}
          loader={<div className="loader">Loading ...</div>}>

          <div className="container-fluid gallery" id="gallery">

            <div className="visible-xs">
              <p style={{color: '#aaa', fontSize: '18px', fontFamily: 'TateNewPro'}}><em>Recognition</em> is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection. Scroll down to browse the gallery.</p>
            </div>

            {this.state.items.map((item, index) => (<GalleryItem key={index + item.input.img} item={item}/>))}
          </div>

        </InfiniteScroll>
      </div>);

    }
  }
}

export default Gallery;
