import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Gallery from './presenter';

const mapStateToProps = (state, ownProps = {}) => {
  return {
    matches: state.matches
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
