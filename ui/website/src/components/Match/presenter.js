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
import styles from './styles.js';

import Titles from './presenter_titles';
import Description from './presenter_description';
import BoundedImage from './BoundedImage'

import InfiniteScroll from 'react-infinite-scroller';
import GoogleTagManager from '../GoogleTagManager';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Match extends React.Component {

  constructor(props) {
    super(props);

    const offset = 3;

    this.state = {
      items: [],
      hasMoreItems: true,
      offset: offset,
      overLeft: {hash: [], index: -1},
      overRight: {hash: [], index: -1}
    }

    this.loadItems = this.loadItems.bind(this);
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


  render() {

    if(!this.props.item) return null;

    const item = this.props.item;
    const selectedOutput = item.output.filter(item => item.selected)[0];

    const inputOrientation = item.input.meta.height > item.input.meta.width ?
      "vertical" : "horizontal";

    const outputOrientation = selectedOutput.meta.height > selectedOutput.meta.width ?
      "vertical" : "horizontal";

    const rx = /Z_\d+_(.*?)_/g;
    const arr = rx.exec(item.input.img);
    const itemId = arr[1];

    let orientedComponent;

    const loader = <div className="loader">Loading ...</div>;
    const followingMatches = this.renderItems();

    switch (inputOrientation) {

      case "horizontal":
        switch (outputOrientation) {
          case "horizontal":
            orientedComponent = (<div className="row">
              <div className="col-sm-5">
                <Titles input={item.input} output={selectedOutput}/>
                <BoundedImage
                  item={item.input}
                  itemId={itemId}
                  features={selectedOutput.features.in}
                  onOver={this.handleLeftOver}
                  overHash={this.state.overRight}
                  parent={this}
                />
                <p style={styles.imgDescription}>{item.input.meta.origin}</p>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={selectedOutput}
                  itemId={itemId}
                  features={selectedOutput.features.out}
                  onOver={this.handleRightOver}
                  overHash={this.state.overLeft}
                  parent={this}
                />
                <p style={styles.imgDescription}>{selectedOutput.meta.origin}</p>
              </div>
              <div className="col-sm-2">
                <Description id={itemId}
                             descriptionIn={selectedOutput.features.in.captions.caption}
                             descriptionOut={selectedOutput.features.out.captions.caption}/>
              </div>
            </div>);
            break;
          case "vertical":
            orientedComponent = (<div className="row">
              <div className="col-sm-5">
                <BoundedImage
                  item={item.input}
                  itemId={itemId}
                  features={selectedOutput.features.in}
                  onOver={this.handleLeftOver}
                  overHash={this.state.overRight}
                  parent={this}
                />
                <p style={styles.imgDescription}>{item.input.meta.origin}</p>
                <Titles input={item.input} output={selectedOutput}/>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={selectedOutput}
                  itemId={itemId}
                  features={selectedOutput.features.out}
                  onOver={this.handleRightOver}
                  overHash={this.state.overLeft}
                  parent={this}
                />
                <p style={styles.imgDescription}>{selectedOutput.meta.origin}</p>
              </div>
              <div className="col-sm-2">
                <Description id={itemId}
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
                <Titles input={item.input} output={selectedOutput}/>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={item.input}
                  itemId={itemId}
                  features={selectedOutput.features.in}
                  onOver={this.handleLeftOver}
                  overHash={this.state.overRight}
                  parent={this}
                />
                <p style={styles.imgDescription}>{item.input.meta.origin}</p>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={selectedOutput}
                  itemId={itemId}
                  features={selectedOutput.features.out}
                  onOver={this.handleRightOver}
                  overHash={this.state.overLeft}
                  parent={this}
                />
                <p style={styles.imgDescription}>{selectedOutput.meta.origin}</p>
                <Description id={itemId}
                             descriptionIn={selectedOutput.features.in.captions.caption}
                             descriptionOut={selectedOutput.features.out.captions.caption}/>
              </div>
            </div>);
            break;
          case "vertical":
            orientedComponent = (<div className="row">
              <div className="col-sm-2">
                <Titles input={item.input} output={selectedOutput}/>
                <Description id={itemId}
                             descriptionIn={selectedOutput.features.in.captions.caption}
                             descriptionOut={selectedOutput.features.out.captions.caption}/>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={item.input}
                  itemId={itemId}
                  features={selectedOutput.features.in}
                  onOver={this.handleLeftOver}
                  overHash={this.state.overRight}
                  parent={this}
                />
                <p style={styles.imgDescription}>{item.input.meta.origin}</p>
              </div>
              <div className="col-sm-5">
                <BoundedImage
                  item={selectedOutput}
                  itemId={itemId}
                  features={selectedOutput.features.out}
                  onOver={this.handleRightOver}
                  overHash={this.state.overLeft}
                  parent={this}
                />
                <p style={styles.imgDescription}>{selectedOutput.meta.origin}</p>
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
      { this.props.followingMatches ?
          (<InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={this.state.hasMoreItems}
            loader={loader}>
            {followingMatches}
          </InfiniteScroll>) : ''
      }
      <GoogleTagManager dataLayerName={'Match-' + itemId} />
    </div>);
  }
}

export default Match;
