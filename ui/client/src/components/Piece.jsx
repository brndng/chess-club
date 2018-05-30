import React from 'react';

const chessmen = {
  p: {symbol: '♟', color: 'piece-black'},
  n: {symbol: '♞', color: 'piece-black'},
  b: {symbol: '♝', color: 'piece-black'},
  r: {symbol: '♜', color: 'piece-black'},
  q: {symbol: '♛', color: 'piece-black'},
  k: {symbol: '♚', color: 'piece-black'},
  P: {symbol: '♟', color: 'piece-white'},
  N: {symbol: '♞', color: 'piece-white'},
  B: {symbol: '♝', color: 'piece-white'},
  R: {symbol: '♜', color: 'piece-white'},
  Q: {symbol: '♛', color: 'piece-white'},
  K: {symbol: '♚', color: 'piece-white'},
}

const Piece = (props) => {
  const { symbol, color } = chessmen[props.piece];
  return <div className={color}>{symbol}</div>
}

export default Piece;
