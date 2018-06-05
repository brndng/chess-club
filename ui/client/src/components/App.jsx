import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import PrivateRoute from './PrivateRoute.jsx';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import GameList from  './GameList.jsx';
import Game from './Game.jsx';
import Profile from './Profile.jsx';
import Players from './Players.jsx';
import Logout from './Logout.jsx';
import SessionChecker from './SessionChecker.jsx';
import { storeUser } from '../actions/';
import auth from '../auth.js';

axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
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
        <Route exact path='/' component={props => <SessionChecker component={Landing} {...props} />} />
        <Route path='/gamelist' component={props => <SessionChecker component={GameList} {...props} />} />
        <Route path='/game' component={props => <SessionChecker component={Game} {...props} />} />
        <Route path='/profile' component={props => <SessionChecker component={Profile} {...props} />} />
        <Route path='/players' component={props => <SessionChecker component={Players} {...props} />} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}

export default App;

