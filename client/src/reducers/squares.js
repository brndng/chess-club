import { initialSquares } from '../../../rules/utilities';

export default (state = {}, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
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
    }
    case 'SQUARE_UPDATED': {
      const { location, piece, candidateSquares, isAlly } = action.payload;
      newState[location] = { piece, candidateSquares, isAlly }
      return newState;
    }
  }
  return newState;
}
