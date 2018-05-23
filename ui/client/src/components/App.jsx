import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Dashboard from './Dashboard.jsx';
import GameList from  './GameList.jsx';
import Game from './Game.jsx';


const App = (props) => {
  return (
    <div>
      <Route exact path='/' component={Dashboard} />
      <Route path='/gamelist' component={GameList} />
      <Route path='/game' component={Game} />
    </div>
  );
}

export default App;
