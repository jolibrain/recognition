import * as actionTypes from '../constants/actionTypes';

export function setMatches(matches) {
    return {
      type: actionTypes.MATCHES_SET,
      matches
    };
};
