import React, { Component } from 'react';
import Game from './Game.jsx'

class GameRooms extends Component {
  constructor(props) {
    super(props)
    this.state = { gameId: null }
  }

  setGameRoom(id) {
    this.setState({ gameId: id });
  }

  render() {
    const { gameId } = this.state;
    return (
      <div>
        Hello from GameRooms!
        <li><a href="#" onClick={() => {this.setGameRoom(1)}}>Game 1</a></li>
        <li><a href="#" onClick={() => {this.setGameRoom(2)}}>Game 2</a></li>
        <li><a href="#" onClick={() => {this.setGameRoom(3)}}>Game 3</a></li>
        {/* {this.state.room === null ? null : <Game gameId={gameId}/>} */}
        <Game gameId={1337}/>
      </div>
    );
  }
}

export default GameRooms;