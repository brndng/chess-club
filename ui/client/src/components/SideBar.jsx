import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Logout from './Logout.jsx';

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="sidebar">
        <div>
          <p>Welcome,</p>
          <p>{user.username}</p>
        </div>
        <Logout />
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
}

export default withRouter(connect(mapStateToProps)(SideBar));