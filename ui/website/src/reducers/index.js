import { combineReducers } from 'redux';
import photo from './photo';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  photo,
  routing: routerReducer
});
