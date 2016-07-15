import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Match from './presenter';

const mapStateToProps = (state, ownProps = {}) => {

  if(state.matches.length > 0) {

    return {
      item: state.matches.filter(item => item.input.img == '/img/reuters/' + ownProps.params.matchId + '.jpg')[0]
    };

  }

  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);
