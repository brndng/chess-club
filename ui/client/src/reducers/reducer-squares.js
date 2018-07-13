export default (state={}, action) => {
  const newState = {...state};

  switch(action.type) {
    case 'GAME_INITIALIZED': {
      const { squares } = action.payload;
      return squares;
      break;
    }
    case 'SQUARE_UPDATED': {
      const { location, piece, candidateSquares, isAlly } = action.payload;
      newState[location] = { piece, candidateSquares, isAlly }
      return newState;
      break;
    }
  }
  return newState;
}