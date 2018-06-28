import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { authenticate } from '../actions/';

axios.defaults.withCredentials = true;

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  async logout() {
    const { authenticate, history } = this.props;
    const response = await axios.get(`https://chess-club.herokuapp.com/users/logout`);
    authenticate(false);
    history.push('/');
  }

  render() {
    return (
      <div className="logout">
        <a onClick={() => this.logout()}>LOG OUT</a>
      </div>
    );
  }
}

const mapStateToProps = ({ isAuthenticated }) => {
  return { isAuthenticated };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ authenticate }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Logout));

