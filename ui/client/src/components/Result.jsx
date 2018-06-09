import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { completed, result } = this.props;
    return completed
      && <ul>
           <li> 
             {result} 
           </li>
         </ul>
  }
}

const mapStateToProps = ({ userId, completed, result }) => {
  return { userId, completed, result }
}

export default connect(mapStateToProps, null)(Result);