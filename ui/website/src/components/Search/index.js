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
import Pikaday from 'react-pikaday';

@Radium
class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      dateString: "All",
      date: "",
      order: "DATE NEWEST TO OLDEST",
      type: "ALL",
      displayOrder: false,
      displayType: false
    };

    this.toggleOrderDisplay = this.toggleOrderDisplay.bind(this);
    this.toggleTypeDisplay = this.toggleTypeDisplay.bind(this);
    this.toggleDateDisplay = this.toggleDateDisplay.bind(this);

    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
  }

  toggleOrderDisplay() {
    this.setState({displayOrder: !this.state.displayOrder});
  }

  toggleTypeDisplay() {
    this.setState({displayType: !this.state.displayType});
  }

  toggleDateDisplay(date) {
    this.setState({displayDate: !this.state.displayDate});
  }

  handleOrderChange(order) {
    this.setState({order: order});
    this.toggleOrderDisplay();
    this.props.onSort({order: order, type: this.state.type});
  }

  handleTypeChange(type) {
    this.setState({type: type});
    this.toggleTypeDisplay();
    this.props.onSort({order: this.state.order, type: type});
  }

  handleDateChange(date) {
    this.setState({date: date});
    this.toggleDateDisplay();
  }

  handleSearchSubmit() {
    this.props.onSearch(this.refs.searchInput.value);
  }

  handleSearchKeyPress(e) {
    if (e.charCode == 13) {
      this.props.onSearch(this.refs.searchInput.value);
    }
  }

  render() {
/*
              <div className="col-md-4">
                <span style={{color: "#4a4a4a"}}>DATE:</span>
                <span style={{margin: "5px 0px"}} onClick={this.toggleDateDisplay}>{this.state.dateString}</span>
                <span className="icon--i_chevron-down" style={{color: "#4a4a4a"}}/>
                <p><Pikaday value={this.state.date} onChange={this.handleDateChange} /></p>
              </div>
*/
    return <div id="search" style={styles.uppercase}>
      <div className="container">
        <div className="visible-xs">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="row">
                <div className="col-xs-12">
                  <span className="icon--i_search"></span>
                  <input ref="searchInput" type="text" placeholder="Search" style={{width: "80%", borderBottom:"2px dotted rgba(255, 255, 255, 0.8)", background: "#0d1215",color: "#FFF",borderTop: "0",borderLeft: "0",borderRight: "0",marginLeft: "20px",marginBottom: "40px"}} onKeyPress={this.handleSearchKeyPress}/>
                  <button onClick={this.handleSearchSubmit} className="btn btn-default pull-right" style={{color:"#FFF", backgroundColor: "#000", border:"1px solid #4a4a4a", borderRadius: "0"}}>SEARCH</button>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6">
                  <span style={{color: "#4a4a4a"}}>SORT:</span>
                  { this.state.displayOrder ?
                    <ul>
                      <li onClick={this.handleOrderChange.bind(this, "DATE NEWEST TO OLDEST")}>DATE NEWEST TO OLDEST</li>
                      <li onClick={this.handleOrderChange.bind(this, "DATE OLDEST TO NEWEST")}>DATE OLDEST TO NEWEST</li>
                    </ul>
                    : <span className="hoverable" style={{margin: "5px 0px"}} onClick={this.toggleOrderDisplay}>{this.state.order}<span className="chevron icon--i_chevron-down" style={{color: "#4a4a4a"}}/></span> }
                  </div>
                <div className="col-xs-6">
                  <span style={{color: "#4a4a4a"}}>MATCH TYPE:</span>
                  { this.state.displayType ?
                  <ul>
                    <li onClick={this.handleTypeChange.bind(this, "ALL")}>ALL</li>
                    <li onClick={this.handleTypeChange.bind(this, "OBJECT")}>OBJECT</li>
                    <li onClick={this.handleTypeChange.bind(this, "FACE")}>FACE</li>
                    <li onClick={this.handleTypeChange.bind(this, "COMPOSITION")}>COMPOSITION</li>
                    <li onClick={this.handleTypeChange.bind(this, "CONTEXT")}>CONTEXT</li>
                  </ul>
                  : <span className="hoverable" style={{margin: "5px 0px"}} onClick={this.toggleTypeDisplay}>{this.state.type}<span className="chevron icon--i_chevron-down" style={{color: "#4a4a4a"}}/></span> }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden-xs">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="row">
                <div className="col-md-12">
                  <span className="icon--i_search"></span>
                  <input ref="searchInput" type="text" placeholder="Search" style={{width: "80%", borderBottom:"2px dotted rgba(255, 255, 255, 0.8)", background: "#0d1215",color: "#FFF",borderTop: "0",borderLeft: "0",borderRight: "0",marginLeft: "20px",marginBottom: "40px"}} onKeyPress={this.handleSearchKeyPress}/>
                  <button onClick={this.handleSearchSubmit} className="btn btn-default pull-right" style={{color:"#FFF", backgroundColor: "#000", border:"1px solid #4a4a4a", borderRadius: "0"}}>SEARCH</button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <span style={{color: "#4a4a4a"}}>SORT:</span>
                  { this.state.displayOrder ?
                    <ul>
                      <li onClick={this.handleOrderChange.bind(this, "DATE NEWEST TO OLDEST")}>DATE NEWEST TO OLDEST</li>
                      <li onClick={this.handleOrderChange.bind(this, "DATE OLDEST TO NEWEST")}>DATE OLDEST TO NEWEST</li>
                    </ul>
                    : <span className="hoverable" style={{margin: "5px 0px"}} onClick={this.toggleOrderDisplay}>{this.state.order}<span className="chevron icon--i_chevron-down" style={{color: "#4a4a4a"}}/></span> }
                  </div>
                <div className="col-md-4">
                  <span style={{color: "#4a4a4a"}}>MATCH TYPE:</span>
                  { this.state.displayType ?
                  <ul>
                    <li onClick={this.handleTypeChange.bind(this, "ALL")}>ALL</li>
                    <li onClick={this.handleTypeChange.bind(this, "OBJECT")}>OBJECT</li>
                    <li onClick={this.handleTypeChange.bind(this, "FACE")}>FACE</li>
                    <li onClick={this.handleTypeChange.bind(this, "COMPOSITION")}>COMPOSITION</li>
                    <li onClick={this.handleTypeChange.bind(this, "CONTEXT")}>CONTEXT</li>
                  </ul>
                  : <span className="hoverable" style={{margin: "5px 0px"}} onClick={this.toggleTypeDisplay}>{this.state.type}<span className="chevron icon--i_chevron-down" style={{color: "#4a4a4a"}}/></span> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Search;
