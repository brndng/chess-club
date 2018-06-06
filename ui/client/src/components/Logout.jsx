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

  render() {
    const { isAuthenticated } = this.props;
    return isAuthenticated === true 
      ? <li className="logout">
          <p>Welcome!</p> 
          <a onClick={() => {
            this.logout()
          }}>LOG OUT</a>
        </li>
      : <li className="logout">
          <p>You are not logged in</p>
        </li>
  }
}

const mapStateToProps = ({ isAuthenticated }) => {
  return { isAuthenticated };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ authenticate }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Logout));

// const Logout = withRouter(({ history }) => {
//   return auth.isAuthenticated === true 
//     ? <li className="logout">
//         <p>Welcome!</p> <a onClick={() => {
//           auth.logout(() => history.push('/'))
//         }}>LOG OUT</a>
//       </li>
//     : <li className="logout">
//         <p>You are not logged in</p>
//       </li>
// });

// export default Logout;