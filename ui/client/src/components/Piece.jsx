import React from 'react';

const lookupPieces = {
  p: '♟',
  n: '♞',
  b: '♝',
  r: '♜',
  q: '♛',
  k: '♚',
  P: '♙',
  N: '♘',
  B: '♗',
  R: '♖',
  Q: '♕',
  K: '♔',
}

const Piece = (props) => {
  return <button>{lookupPieces[props.piece]}</button>
}

export default Piece;
