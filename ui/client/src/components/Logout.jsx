import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../auth.js';

const Logout = withRouter(({ history }) => {
  return auth.isAuthenticated === true 
    ? <p>
        Welcome! <button onClick={() => {
          auth.signout(() => history.push('/'))
        }}>SIGN OUT</button>
      </p>
    : <p>You are not logged in</p>
});

export default Logout;