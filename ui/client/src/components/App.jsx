import React from 'react';
import Board from './Board.jsx';

const App = () => {

  const initBoard = () => {
    const board = [];
    const files = 'hgfedcba';
    for (let i=0; i<8; i++) {
      let row = [];
      for (let j=0; j<8; j++) {
        let rank = i+1;
        let file = files[j];
        row[j] = file + rank;
      }
      board[i] = row;
    }
    console.log(board);
    return board;
  }

  // const rotateBoard = (matrix) => {
  // }
  
  return <div>Hello from App!!!{initBoard()}</div>;
}

export default App;