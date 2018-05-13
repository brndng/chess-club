const updatePosition = (rowStart, colStart, rowEnd, colEnd, pieceToMove) => {
  return {
    type: 'POSITION_CHANGED',
    payload: [ rowStart, colStart, rowEnd, colEnd, pieceToMove ]
  };
}

export default updatePosition;