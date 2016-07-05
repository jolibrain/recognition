import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PHOTOS_SET:
      return setPhotos(state, action);
    case actionTypes.PHOTO_SELECT:
      return selectPhoto(state, action);
  }
  return state;
}

function setPhotos(state, action) {
  const { photos } = action;
  return [ ...state, ...photos ];
}

function selectPhoto(state, action) {
  return state.map(function(photo, index) {
    if(photo.id === action.photo.id) {
      return Object.assign({}, photo, {selected: action.index});
    }
    return photo;
  });
}
