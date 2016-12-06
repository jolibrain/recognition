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

export function loadSplashJson(json) {
  return {
    type: actionTypes.SPLASH_LOAD_JSON,
    json
  };
};

export function loadMatchJson(json) {
  return {
    type: actionTypes.MATCH_LOAD_JSON,
    json
  };
};

export function searchMatches(input) {
  return {
    type: actionTypes.MATCH_SEARCH,
    input
  };
};

export function sortMatches(sort) {
  return {
    type: actionTypes.MATCH_SORT,
    sort
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
