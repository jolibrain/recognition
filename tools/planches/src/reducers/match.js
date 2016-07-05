import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MATCHES_SET:
      return setMatches(state, action);
  }
  return state;
}

function setMatches(state, action) {
  const { matches } = action;
  return [ ...state, ...matches ];
}
