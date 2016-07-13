import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import GalleryItem from './presenter';

const mapStateToProps = (state, ownProps = {}) => {
  return {
    item: ownProps.item
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
