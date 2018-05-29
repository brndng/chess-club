import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import axios from 'axios';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import GameList from  './GameList.jsx';
import Game from './Game.jsx';
import Profile from './Profile.jsx';
import Players from './Players.jsx';
import Logout from './Logout.jsx';
import auth from '../auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('Private Route, auth.isAuthenticated',auth.isAuthenticated)

  //put ajax call in here to check for token, so page persists on refresh

  return <Route {...rest} render={(props) => ( 
    auth.isAuthenticated === true 
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
}
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('CDM auth.isAuthenticated BEFORE', auth.isAuthenticated);
    // auth.isAuthenticated = true 
    // console.log('CDM auth.isAuthenticated AFTER', auth.isAuthenticated);

  }

  render() {
    return (
      <div>
        <div className="nav">
          <ul>
            <li><Link to='/profile'> PROFILE </Link></li>
            <li><Link to='/gamelist'> GAMES </Link></li>
            <li><Link to='/players'> PLAYERS </Link></li>
          </ul>
          <ul>
            <Logout />
          </ul>
        </div>
        <Route exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/gamelist' component={GameList} />
        <Route path='/game' component={Game} />
        <Route path='/profile' component={Profile} />
        <Route path='/players' component={Players} />
      </div>
    );
  }
}

export default App;
