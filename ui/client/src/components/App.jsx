import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import GameList from  './GameList.jsx';
import Game from './Game.jsx';
import Profile from './Profile.jsx';
import Players from './Players.jsx';
import Logout from './Logout.jsx';
import ComponentWithAuth from './ComponentWithAuth.jsx';

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
        <Route exact path='/' component={props => <ComponentWithAuth component={Landing} {...props} />} />
        <Route path='/gamelist' component={props => <ComponentWithAuth component={GameList} {...props} />} />
        <Route path='/game' component={props => <ComponentWithAuth component={Game} {...props} />} />
        <Route path='/profile' component={props => <ComponentWithAuth component={Profile} {...props} />} />
        <Route path='/players' component={props => <ComponentWithAuth component={Players} {...props} />} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}

export default App;

