import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import GameList from  './GameList.jsx';
import Game from './Game.jsx';
import CompletedGame from './CompletedGame.jsx';
import Challenge from './Challenge.jsx';
import Archive from './Archive.jsx';
import NavBar from './NavBar.jsx';
import withAuthentication from '../HOC/withAuthentication.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="route-container">
        <NavBar />
        <Route exact path='/' render={props => <LandingWithAuth {...props} />} />
        <Route path='/gamelist' render={props => <GameListWithAuth {...props} />} />
        <Route path='/game/:id' render={props => <GameWithAuth {...props} />} />
        <Route path='/challenge' render={props => <ChallengeWithAuth {...props} />} />
        <Route path='/archive' render={props => <ArchiveWithAuth {...props} />} />
        <Route path='/completed/:id' render={props => <CompletedGameWithAuth {...props} />} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}

var LandingWithAuth = withAuthentication(Landing);
var GameListWithAuth = withAuthentication(GameList);
var GameWithAuth = withAuthentication(Game);
var ChallengeWithAuth = withAuthentication(Challenge);
var ArchiveWithAuth = withAuthentication(Archive);
var CompletedGameWithAuth = withAuthentication(CompletedGame);

export default App;


