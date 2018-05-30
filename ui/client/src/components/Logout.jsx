import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../auth.js';

const Logout = withRouter(({ history }) => {
  return auth.isAuthenticated === true 
    ? <li className="logout">
        <p>Welcome!</p> <a onClick={() => {
          auth.signout(() => history.push('/'))
        }}>LOG OUT</a>
      </li>
    : <li className="logout">
        <p>You are not logged in</p>
      </li>
});

export default Logout;