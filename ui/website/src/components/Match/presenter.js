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
import Radium from 'radium';
import Router from 'react-router';
import { browserHistory } from 'react-router';
import styles from './styles.js';

import Titles from './presenter_titles';
import Description from './presenter_description';
import BoundedImage from './BoundedImage'

import InfiniteScroll from 'react-infinite-scroller';
import GoogleTagManager from '../GoogleTagManager';
import DocMeta from 'react-doc-meta';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Match extends React.Component {

  constructor(props) {
    super(props);

    const offset = 3;

    this.state = {
      itemId: null,
      items: [],
      hasMoreItems: true,
      offset: offset,
      overLeft: {hash: [], index: -1},
      overRight: {hash: [], index: -1}
    }

    this.loadItems = this.loadItems.bind(this);
    this.handleBackGallery = this.handleBackGallery.bind(this);
  }

  handleBackGallery() {
    browserHistory.push('/gallery');
  }

  handleLeftOver(parent, overHash, overIndex) {
    parent.setState({
      overLeft: {hash: overHash, index: -1},
      overRight: {hash: [], index: overIndex}
    });
  }

  handleRightOver(parent, overHash, overIndex) {
    parent.setState({
      overLeft: {hash: [], index: overIndex},
      overRight: {hash: overHash, index: -1}
    });
  }

  componentWillReceiveProps() {
    if(this.state.items.length == 0) this.loadItems();
  }

  componentDidUpdate() {
    if(this.state.items.length == 0) this.loadItems();
  }

  loadItems() {
    const newOffset = this.state.items.length + this.state.offset;

    if(this.props.followingMatches) {
      this.setState({
        items: this.props.followingMatches.slice(0, newOffset),
        hasMoreItems: newOffset < this.props.followingMatches.length
      });
    }
  }

  renderItems() {
    const items = (this.state.items.length == 0 && this.props.folowingMatches) ? this.props.followingMatches.slice(0, this.state.offset) : this.state.items;
    return items.map((item, key) => (<Match key={key} item={item} follower={true}/>));
  }

  componentWillMount() {
    if(this.props.item){
      const rx = /Z_\d+_(.*?)_/g;
      const arr = rx.exec(this.props.item.input.img);
      this.setState({itemId: arr[1]});
    }
  }


  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    const inputOrientation = item.input.meta.height > item.input.meta.width ?
      "vertical" : "horizontal";

    const outputOrientation = selectedOutput.meta.height > selectedOutput.meta.width ?
      "vertical" : "horizontal";

    let orientedComponent;

    const loader = <div className="loader">Loading ...</div>;
    const followingMatches = this.renderItems();

    const meta = [
      {name:"twitter:card", content:"summary_large_image"},
      {name:"twitter:url", content:"http://recognition.tate.org.uk/"},
      {name:"twitter:title", content:"Recognition"},
      {name:"twitter:description", content:"Recognition is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection"},
      {name:"twitter:site", content:"@Tate"},
      {name:"twitter:domain", content:"recognition.tate.org.uk"},
      {property:"og:site_name", content:"Recognition"},
      {name:"twitter:image:src", content:"http://recognition.tate.org.uk/img/default_logo.jpg"},
      {name:"twitter:image:width", content:"1200"},
      {name:"twitter:image:height", content:"628"},
      {property:"og:url", content:"http://recognition.tate.org.uk/"},
      {property:"og:title", content:"Recognition"},
      {property:"og:description", content:"Recognition is an artificial intelligence comparing up-to-the-minute photojournalism with British art from the Tate collection"},
      {property: 'og:image', content: `http://recognition.tate.org.uk/img/og_image/${this.state.itemId}.jpg`}
    ];

    switch (inputOrientation) {

      case "horizontal":
        switch (outputOrientation) {
          case "horizontal":
            orientedComponent = (<div className="row">
              <div className="col-sm-5 horizontal">
                <a className="font-data backGallery" style={{paddingLeft:'32px'}} onClick={this.handleBackGallery}><span className='icon--i_arrow-left'/> Back to gallery</a>
                <Titles input={item.input} output={selectedOutput}/>
                <BoundedImage
                  item={item.input}
                  itemId={this.state.itemId}
                  features={selectedOutput.features.in}
                  onOver={this.handleLeftOver}
                  overHash={this.state.overRight}
                  parent={this}
                />
                <p className="font-subtext" style={styles.imgDescription}>reuters/{item.input.meta.author}</p>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={selectedOutput}
                  itemId={this.state.itemId}
                  features={selectedOutput.features.out}
                  onOver={this.handleRightOver}
                  overHash={this.state.overLeft}
                  parent={this}
                />
                <p className="font-subtext" style={styles.imgDescription}><a href={selectedOutput.meta.link} target="_blank" rel="noopener noreferrer" style={{color: '#4a4a4a', textDecoration: 'none'}}>{selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}</a></p>
              </div>
              <div className="col-sm-2" style={{paddingLeft: 0, paddingRight: 0}}>
                <Description id={this.state.itemId}
                             descriptionIn={selectedOutput.features.in.captions.caption}
                             descriptionOut={selectedOutput.features.out.captions.caption}/>
              </div>
            </div>);
            break;
          case "vertical":
            orientedComponent = (<div className="row">
              <div className="col-sm-5 horizontal">
                <a className="font-data backGallery" style={{paddingLeft:'32px'}} onClick={this.handleBackGallery}><span className='icon--i_arrow-left'/> Back to gallery</a>
                <BoundedImage
                  item={item.input}
                  itemId={this.state.itemId}
                  features={selectedOutput.features.in}
                  onOver={this.handleLeftOver}
                  overHash={this.state.overRight}
                  parent={this}
                />
                <p className="font-subtext" style={styles.imgDescription}>reuters/{item.input.meta.author}</p>
                <Titles input={item.input} output={selectedOutput}/>
              </div>
              <div className="col-sm-5">
                <div className="text-center">
                  <BoundedImage
                    item={selectedOutput}
                    itemId={this.state.itemId}
                    features={selectedOutput.features.out}
                    onOver={this.handleRightOver}
                    overHash={this.state.overLeft}
                    parent={this}
                  />
                </div>
                <p className="font-subtext" style={styles.imgDescription}><a href={selectedOutput.meta.link} target="_blank" rel="noopener noreferrer" style={{color: '#4a4a4a', textDecoration: 'none'}}>{selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}</a></p>
              </div>
              <div className="col-sm-2" style={{paddingLeft: 0, paddingRight: 0}}>
                <Description id={this.state.itemId}
                             descriptionIn={selectedOutput.features.in.captions.caption}
                             descriptionOut={selectedOutput.features.out.captions.caption}/>
              </div>
            </div>);
            break;
        }
      break;

      case "vertical":
        switch (outputOrientation) {
          case "horizontal":
            orientedComponent = (<div className="row">
              <div className="col-sm-2">
                <a className="font-data backGallery" onClick={this.handleBackGallery}><span className='icon--i_arrow-left'/> Back to gallery</a>
                <Titles input={item.input} output={selectedOutput}/>
              </div>
              <div className="col-sm-5">
                <div className="text-center">
                  <BoundedImage
                    item={item.input}
                    itemId={this.state.itemId}
                    features={selectedOutput.features.in}
                    onOver={this.handleLeftOver}
                    overHash={this.state.overRight}
                    parent={this}
                  />
                </div>
                <p className="font-subtext" style={styles.imgDescription}>reuters/{item.input.meta.author}</p>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={selectedOutput}
                  itemId={this.state.itemId}
                  features={selectedOutput.features.out}
                  onOver={this.handleRightOver}
                  overHash={this.state.overLeft}
                  parent={this}
                />
                <p className="font-subtext" style={styles.imgDescription}><a href={selectedOutput.meta.link} target="_blank" rel="noopener noreferrer" style={{color: '#4a4a4a', textDecoration: 'none'}}>{selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}</a></p>
                <Description id={this.state.itemId}
                             descriptionIn={selectedOutput.features.in.captions.caption}
                             descriptionOut={selectedOutput.features.out.captions.caption}/>
              </div>
            </div>);
            break;
          case "vertical":
            orientedComponent = (<div className="row">
              <div className="col-sm-2">
                <a className="font-data backGallery" onClick={this.handleBackGallery}><span className='icon--i_arrow-left'/> Back to gallery</a>
                <Titles input={item.input} output={selectedOutput}/>
                <div style={{height: '16px'}}>&nbsp;</div>
                <Description id={this.state.itemId}
                             descriptionIn={selectedOutput.features.in.captions.caption}
                             descriptionOut={selectedOutput.features.out.captions.caption}/>
              </div>
              <div className="col-sm-5">
                <div className="text-center">
                  <BoundedImage
                    item={item.input}
                    itemId={this.state.itemId}
                    features={selectedOutput.features.in}
                    onOver={this.handleLeftOver}
                    overHash={this.state.overRight}
                    parent={this}
                  />
                </div>
                <p className="font-subtext" style={styles.imgDescription}>reuters/{item.input.meta.author}</p>
              </div>
              <div className="col-sm-5">
                <div className="text-center">
                  <BoundedImage
                    item={selectedOutput}
                    itemId={this.state.itemId}
                    features={selectedOutput.features.out}
                    onOver={this.handleRightOver}
                    overHash={this.state.overLeft}
                    parent={this}
                  />
                </div>
                <p className="font-subtext" style={styles.imgDescription}><a href={selectedOutput.meta.link} target="_blank" rel="noopener noreferrer" style={{color: '#4a4a4a', textDecoration: 'none'}}>{selectedOutput.meta.copyright ? selectedOutput.meta.copyright : '© TATE'}</a></p>
              </div>
            </div>);
            break;
        }
      break;
    }

    return (<div>
      <div className="container-fluid" style={styles.matchContainer}>
        {orientedComponent}
      </div>
    </div>);
  }
}

export default Match;
