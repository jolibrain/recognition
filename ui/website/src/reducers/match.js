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
import * as actionTypes from '../constants/actionTypes';
import moment from 'moment';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MATCH_LOAD_JSON:
      return loadMatchJson(state, action);
    case actionTypes.MATCH_ADD:
      return addMatch(state, action);
    case actionTypes.MATCH_SORT:
      return sortMatches(state, action);
    case actionTypes.MATCH_SEARCH:
      return searchMatches(state, action);
    case actionTypes.MATCH_SELECT_ITEM:
      return selectMatchItem(state, action);
  }
  return state;
}

function addMatch(state, action) {
  const existingMatch = state.find(item => item.img === action.match.input.img );

  if(existingMatch) {
    return Object.assign([], state,
      state.map(match=> {
        if(match.img === action.match.input.img) {
          match.items.push(action.match);
        }
        return match
      })
    );
  } else {
    action.match.selected = true;
    return Object.assign([], state, [
      ...state,
      {
        img: action.match.input.img,
        items: [action.match]
      }
    ]);
  }
}

function loadMatchJson(state, action) {
  const { json } = action;

  json.forEach(item => {

    item.output = item.output.sort((a, b) => b.features.score - a.features.score);

    const selectedItem = item.output.some(output => {
      return output.selected;
    });

    if(!selectedItem) {
      item.output[0].selected = true;
    }

  });

  const publishedMatches = json.filter(item => item.status == "published");

  return [ ...state, ...publishedMatches ];
}

function searchMatches(state, action) {
}

function sortMatches(state, action) {
  const sorting = action.sort;

  let sortedMatches = state;

  switch(sorting.order) {
    case "ALPHABETICAL A TO Z":
      sortedMatches = sortedMatches.sort((a, b) => {
        return a.input.meta.caption.localeCompare(b.input.meta.caption);
      });
      break;
    case "ALPHABETICAL Z TO A":
      sortedMatches = sortedMatches.sort((b, a) => {
        return a.input.meta.caption.localeCompare(b.input.meta.caption);
      });
      break;
    case "DATE NEWEST TO OLDEST":
      sortedMatches = sortedMatches.sort((b, a) => {
        if(moment(a.timestamp).milli < moment(b.timestamp).milli) return -1;
        if(moment(a.timestamp).milli > moment(b.timestamp).milli) return 1;
        return 0;
      });
      break;
    case "DATE OLDEST TO NEWEST":
      sortedMatches = sortedMatches.sort((a, b) => {
        if(moment(a.timestamp).milli < moment(b.timestamp).milli) return -1;
        if(moment(a.timestamp).milli > moment(b.timestamp).milli) return 1;
        return 0;
      });
      break;
  }

  return sortedMatches;
}

function selectMatchItem(state, action) {
  const { match, item } = action;
  return Object.assign([], state,
    state.map(match=> {
      if(match.input.img === action.match.input.img) {
        match.output.forEach(output => {
          return output.selected = false || output.img == item.img;
        });
      }
      return match
    })
  );
}
