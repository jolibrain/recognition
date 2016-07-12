import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Detail from './presenter';

const mapStateToProps = (state, ownProps = {}) => {

  if(state.matches.length > 0 && ownProps.params) {

    const item = state.matches.filter(item => item.id === ownProps.params.matchId)[0];

    return {
      item: item
    };

  }

  return {};

}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
