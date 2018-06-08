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
    const response = await axios.get(`http://localhost:3000/users/logout`);
    authenticate(false);
    history.push('/');
  }

  // redirectToLogin() {
  //   const { history } = this.props;
  //   history.push('/login');
  // }

  render() {
    const { isAuthenticated } = this.props;
   
    return isAuthenticated
      ? <li className="logout">
          <a onClick={() => this.logout()}>LOG OUT</a>
        </li>
      : <li></li>
  }

  // render() {
  //   const { isAuthenticated } = this.props;
  //   const onClick = isAuthenticated
  //     ? () => this.logout()
  //     : () => this.redirectToLogin();
  //   const text = isAuthenticated
  //     ? 'LOG OUT'
  //     : 'LOG IN';
  //   return (
  //     <li className="logout">
  //       <a onClick={onClick}>{text}</a>
  //     </li>
  //   )
  // }
}

const mapStateToProps = ({ isAuthenticated }) => {
  return { isAuthenticated };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ authenticate }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Logout));

