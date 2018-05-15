const castleKing = (rowStart, colStart, rowEnd, colEnd, pieceToMove) => {
  return {
    type: 'CASTLING',
    payload: {rowStart, colStart, rowEnd, colEnd, pieceToMove},
  };
}

export default castleKing;