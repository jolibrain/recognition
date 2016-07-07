import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import GalleryItem from './presenter';

const mapStateToProps = (state, ownProps = {}) => {
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectMatchItem: bindActionCreators(actions.selectMatchItem, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
