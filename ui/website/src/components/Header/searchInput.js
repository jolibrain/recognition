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
import Autosuggest from 'react-autosuggest';
import theme from './searchInput.css';
import Fuse from 'fuse.js';
import moment from 'moment';
import { browserHistory } from 'react-router'

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class SearchInput extends React.Component {

  constructor() {
    super();

    this.state = {
      matches: [],
      value: '',
      suggestions: []
    };

    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.matches.length == 0) this.setState({matches: nextProps.matches});
  }

  componentWillUpdate(nextProps) {
    if(this.state.matches.length == 0) this.setState({matches: nextProps.matches});
  }

  shouldRenderSuggestions(value) {
    return (typeof value != 'undefined' && value.trim().length > 2);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    if(method == 'click') {
      const input = suggestion.input;

      const rx = /Z_\d+_(.*?)_/g;
      const arr = rx.exec(input.img);
      const itemId = arr[1];

      this.setState({value: '', suggestions: []});
      browserHistory.push(`/gallery/${itemId}`);
    }
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const options = {
      caseSensitive: false,
      shouldSort: true,
      tokenize: false,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: [
        'input.meta.caption',
        'input.meta.date',
        'input.meta.title',
        'input.meta.author',
        'output.meta.caption',
        'output.meta.date',
        'output.meta.title',
        'output.meta.author',
        'output.meta.tags',
        'output.features.in.captions.caption',
        'output.features.out.captions.caption'
      ]
    };

    const fuse = new Fuse(this.state.matches, options);

    return fuse.search(value);
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {

    const input = suggestion.input;
    const output = suggestion.output[0];

    const rx = /Z_\d+_(.*?)_/g;
    const arr = rx.exec(input.img);
    const itemId = arr[1];

    return (
      <Link to={`/details/${itemId}`}>
        <p>{moment(input.meta.date).format('DD/MM/YYYY')}<br/>
        <span className="paddingRight">{input.meta.caption}</span><br/>
        {output.meta.date}<br/>
        <span className="paddingRight"><em>{output.meta.title}</em> by {output.meta.author[0]}</span></p>
      </Link>
    );
  }

  render() {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange,
      autoFocus: true
    };

    return <li>
      <Autosuggest suggestions={suggestions}
                   shouldRenderSuggestions={this.shouldRenderSuggestions}
                   onSuggestionSelected={this.onSuggestionSelected}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={this.renderSuggestion}
                   inputProps={inputProps}
      />
    </li>
  }

}
export default SearchInput;

