import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Preview from './presenter';

function mapStateToProps(state) {
  const photos = state.photo;
  return {
    photos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectPhoto: bindActionCreators(actions.selectPhoto, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
