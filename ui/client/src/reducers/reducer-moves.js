export default (state = [], action) => {
  const newState = state.map(row => [...row]);
  switch(action.type) {
    case 'GAME_INITIALIZED': {
      const { moves } = action.payload;
      return [...moves]; 
      break;
    }
    case 'POSITION_CHANGED': {
      return [...newState, action.payload];
      break;
    }
    
    case 'KING_CASTLED': {
      return [...newState, action.payload];
      break;
    }
    case 'PAWN_PROMOTED': {
      return [...newState, action.payload];
      break;
    }
    case 'EN_PASSANT_APPLIED': {
      const [origin, destin, piece, captured, notation, promotedTo, currentPosition] = action.payload;
      return [...newState, [origin, destin, piece, captured, notation, promotedTo, currentPosition]];
      break;
    }
    case 'CHECKMATE': {
      if (action.payload !== '1/2 - 1/2') {
        const lastNotation = newState.slice(-1)[0][4]; 
        const notationWithMate = `${lastNotation.slice(0, lastNotation.length - 1)}#`;
        newState[newState.length - 1][4] = notationWithMate;
        return newState;
        break;
      }
    }
  }
  return newState;
};