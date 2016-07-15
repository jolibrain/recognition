import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Header from './presenter';

const mapStateToProps = (state, ownProps = {}) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterMatchesOutput: bindActionCreators(actions.filterMatchesOutput, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
