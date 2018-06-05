import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import auth from '../auth.js';

axios.defaults.withCredentials = true;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => {    
    return auth.isAuthenticated === true 
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  }} />
}

export default PrivateRoute;






