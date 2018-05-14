const updatePosition = (origin, destination, pieceToMove) => {
  return {
    type: 'POSITION_CHANGED',
    payload: { origin, destination, pieceToMove } 
  };
}

export default updatePosition;