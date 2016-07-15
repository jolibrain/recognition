import * as actionTypes from '../constants/actionTypes';

export function loadMatchJson(json) {
  return {
    type: actionTypes.MATCH_LOAD_JSON,
    json
  };
};

export function addMatch(match) {
  return {
    type: actionTypes.MATCH_ADD,
    match
  };
};

export function selectMatchItem(match, item) {
  return {
    type: actionTypes.MATCH_SELECT_ITEM,
    match,
    item
  };
};

export function filterMatchesOutput(filter) {
  return {
    type: actionTypes.MATCH_FILTER_OUTPUTS,
    filter
  };
};
