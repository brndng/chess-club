import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { completed, result } = this.props;
    return completed && result;
  }
}

const mapStateToProps = ({ completed, result }) => {
  return { completed, result }
}

export default connect(mapStateToProps)(Result);
