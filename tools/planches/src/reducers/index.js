import { combineReducers } from 'redux';
import matches from './match';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  matches,
  routing: routerReducer
});
