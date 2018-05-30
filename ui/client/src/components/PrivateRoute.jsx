import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import auth from '../auth.js';


const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => ( 
    auth.isAuthenticated === true 
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
}

const withSession = (WrappedComponent) => class extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      const session = await axios.get('http://localhost:3000/users/session');
      console.log('session', session)
      if (session.data === null) {
        auth.isAuthenticated = false;
      } else {
        auth.isAuthenticated = true;
      }
      console.log('auth.isAuthenticated from CDM',auth.isAuthenticated)
    } catch (err) {
      console.log('err from PrivateRoute', err)
    }
  }

  render() {
    return <WrappedComponent {...this.props} />
  }
}

const PrivateRoute = withSession(AuthenticatedRoute);

export default PrivateRoute;

