import * as actionTypes from '../constants/actionTypes';

export function setPhotos(photos) {
    return {
      type: actionTypes.PHOTOS_SET,
      photos
    };
};

export function selectPhoto(photo, index) {
    return {
      type: actionTypes.PHOTO_SELECT,
      photo,
      index
    };
};
