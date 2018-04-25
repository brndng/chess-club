import React, { Component } from 'react';
import Board from './Board.jsx';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      selection: null,
    }
  }

  // selectPiece(selection) {
  //   this.setState({ selection });
  // }

  render() {
    return (
      <Board 
        // selectPiece={this.selectPiece.bind(this)}
        currentPiece={this.state.currentPiece}
      />
    )
  }
}

export default Game;