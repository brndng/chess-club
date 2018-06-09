import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import GameList from  './GameList.jsx';
import Game from './Game.jsx';
import Profile from './Profile.jsx';
import Players from './Players.jsx';
import NavBar from './NavBar.jsx';
import withAuthentication from '../HOC/withAuthentication.jsx';

axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="route-container">
        <NavBar />
        <Route exact path='/' render={props => <LandingWithAuth {...props} />} />
        <Route path='/profile' render={props => <ProfileWithAuth {...props} />} />
        <Route path='/gamelist' render={props => <GameListWithAuth {...props} />} />
        <Route path='/game/:id' render={props => <GameWithAuth {...props} />} />
        <Route path='/players' render={props => <PlayersWithAuth {...props} />} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}

var LandingWithAuth = withAuthentication(Landing);
var ProfileWithAuth = withAuthentication(Profile);
var GameListWithAuth = withAuthentication(GameList);
var GameWithAuth = withAuthentication(Game);
var PlayersWithAuth = withAuthentication(Players);

export default App;


