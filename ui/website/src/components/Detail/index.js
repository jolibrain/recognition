import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Detail from './presenter';

const mapStateToProps = (state, ownProps = {}) => {

  if(state.matches.length > 0) {

    let matchId = null;
    if(ownProps.params) {
      matchId = ownProps.params.matchId;
    } else if(state.routing.locationBeforeTransitions.pathname) {
      matchId = state.routing.locationBeforeTransitions.pathname.split("/").pop();
    }

    return {
      item: state.matches.filter(item => item.input.img == '/img/reuters/' + matchId  + '.jpg')[0]
    };

  }

  return {};

}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
