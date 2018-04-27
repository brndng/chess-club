import React, { Component } from 'react';
import Square from './Square.jsx';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placed: false,
      whiteToMove: true,
    }
  }

  togglePlaced() {
    this.state.placed ? 
    this.setState({ placed: false }) :
    this.setState({ placed: true });
  }

  toggleTurn() {
    this.state.whiteToMove ?
    this.setState({ whiteToMove: false }) :
    this.setState({ whiteToMove: true })
  }

  createRow(rank) {
    const row = [];
    const files = 'abcdefgh';
    for (let i=0; i<8; i++) {
      let file = files[i];
      row[i] = <Square 
        files={files}
        rank={rank} 
        file={file}
        togglePlaced={this.togglePlaced.bind(this)}
        placed={this.state.placed}
        toggleTurn={this.toggleTurn.bind(this)}
        whiteToMove={this.state.whiteToMove}
        key={i} />;
    }
    return <div className="row">{row}</div>;
  }

  render() {
    console.log('whiteToMove:', this.state.whiteToMove, 'placed:', this.state.placed)
    return (
      <div>
        <h3>{this.state.whiteToMove ? 'White To Move' : 'Black To Move'}</h3>
        <div className="board">
          {this.createRow(8)}
          {this.createRow(7)}
          {this.createRow(6)}
          {this.createRow(5)}
          {this.createRow(4)}
          {this.createRow(3)}
          {this.createRow(2)}
          {this.createRow(1)}
        </div>
      </div>
      
    );
  }
}

export default Board;