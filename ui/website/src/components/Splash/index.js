import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Splash from './presenter';

const mapStateToProps = (state, ownProps = {}) => {
  const match = state.matches[0];
  return {
    match;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
