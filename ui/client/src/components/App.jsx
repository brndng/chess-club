import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import PrivateRoute from './PrivateRoute.jsx';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import GameList from  './GameList.jsx';
import Game from './Game.jsx';
import Profile from './Profile.jsx';
import Players from './Players.jsx';
import Logout from './Logout.jsx';
import auth from '../auth.js';

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
      <div className="route-container">
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
        <Route exact path='/' component={Landing} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/gamelist' component={GameList} />
        <PrivateRoute path='/game' component={Game} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/players' component={Players} />
      </div>
    );
  }
}

export default App;
