import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MATCH_LOAD_JSON:
      return loadMatchJson(state, action);
    case actionTypes.MATCH_ADD:
      return addMatch(state, action);
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

    item.output = item.output.sort((a, b) => a.features.score - b.features.score);

    const selectedItem = item.output.some(output => {
      return output.selected;
    });

    if(!selectedItem) {
      item.output[0].selected = true;
    }

  });

  return [ ...state, ...json ];
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
