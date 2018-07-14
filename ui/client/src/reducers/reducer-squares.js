import { initialSquares } from '../../../../rules/utilities';

export default (state={}, action) => {
  const newState = {...state};
  switch(action.type) {
    case 'GAME_INITIALIZED': {
      const { userId, white } = action.payload;
      for (let square in initialSquares) {
        const { piece } = initialSquares[square];
        if ((userId === white) === (piece && piece === piece.toUpperCase())) {
          initialSquares[square].isAlly = true;
        } else {
          initialSquares[square].isAlly = false;;
        }
      }
      return initialSquares;
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