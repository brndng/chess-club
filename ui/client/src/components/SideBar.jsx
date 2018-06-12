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
        <div className="welcome">
          <p className="welcome-greeting">Welcome,</p>
          <p className="welcome-username">{user.username}</p>
        </div>
        <div className="sidebar-bottom">
          <Logout />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
}

export default withRouter(connect(mapStateToProps)(SideBar));