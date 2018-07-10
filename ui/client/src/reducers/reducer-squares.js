export default (state={}, action) => {
  const newState = {...state};

  switch(action.type) {
    case 'SQUARE_UPDATED': {
      const { location, piece, candidateSquares } = action.payload;
      newState[location] = { piece, candidateSquares }
      return newState;
      break;
    }
  }
  return newState;
}