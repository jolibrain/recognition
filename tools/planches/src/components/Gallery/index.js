import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Gallery from './presenter';

function mapStateToProps(state) {
  return {
    matches: state.matches
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
