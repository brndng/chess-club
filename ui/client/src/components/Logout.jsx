import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { authenticate } from '../actions/';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated, authenticate, history } = this.props;
    return isAuthenticated === true 
      ? <li className="logout">
          <p>Welcome!</p> 
          <a onClick={() => {
            authenticate(false);
            history.push('/');
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