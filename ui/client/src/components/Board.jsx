import React, { Component } from 'react';
import Square from './Square.jsx';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  createRow(rank) {
    const row = [];
    const files = 'abcdefgh';
    for (let i=0; i<8; i++) {
      let file = files[i];
      row[i] = <Square 
        rank={rank} 
        file={file}
        key={i} />;
    }
    return <div className="row">{row}</div>;
  }

  render() {
    return (
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
    );
  }
}

export default Board;