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
      sort: "ALPHABETICAL A TO Z",
      type: "ALL",
      displaySort: false,
      displayType: false
    };

    this.toggleSortDisplay = this.toggleSortDisplay.bind(this);
    this.toggleTypeDisplay = this.toggleTypeDisplay.bind(this);
    this.toggleDateDisplay = this.toggleDateDisplay.bind(this);

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  toggleSortDisplay() {
    this.setState({displaySort: !this.state.displaySort});
  }

  toggleTypeDisplay() {
    this.setState({displayType: !this.state.displayType});
  }

  toggleDateDisplay(date) {
    this.setState({displayDate: !this.state.displayDate});
  }

  handleSortChange(sort) {
    this.setState({sort: sort});
    this.toggleSortDisplay();
  }

  handleTypeChange(type) {
    this.setState({type: type});
    this.toggleTypeDisplay();
  }

  handleDateChange(date) {
    this.setState({date: date});
    this.toggleDateDisplay();
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
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="row">
              <div className="col-md-12">
                <span className="icon--i_search"></span>
                <input type="text" placeholder="Search" style={{width: "80%", borderBottom:"2px dotted rgba(255, 255, 255, 0.8)", background: "#0d1215",color: "#FFF",borderTop: "0",borderLeft: "0",borderRight: "0",marginLeft: "20px",marginBottom: "40px"}}/>
                <button className="btn btn-default pull-right" style={{color:"#FFF", backgroundColor: "#000", border:"1px solid #4a4a4a", borderRadius: "0"}}>SEARCH</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <span style={{color: "#4a4a4a"}}>SORT:</span>
                { this.state.displaySort ?
                  <ul>
                    <li onClick={this.handleSortChange.bind(this, "ALPHABETICAL A TO Z")}>ALPHABETICAL A TO Z</li>
                    <li onClick={this.handleSortChange.bind(this, "ALPHABETICAL Z TO A")}>ALPHABETICAL Z TO A</li>
                    <li onClick={this.handleSortChange.bind(this, "DATE NEWEST TO OLDEST")}>DATE NEWEST TO OLDEST</li>
                    <li onClick={this.handleSortChange.bind(this, "DATE OLDEST TO NEWEST")}>DATE OLDEST TO NEWEST</li>
                  </ul>
                  : <span className="hoverable" style={{margin: "5px 0px"}} onClick={this.toggleSortDisplay}>{this.state.sort}<span className="chevron icon--i_chevron-down" style={{color: "#4a4a4a"}}/></span> }
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
    </div>;
  }
}

export default Search;
