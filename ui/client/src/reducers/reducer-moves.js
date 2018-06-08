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
    case 'EN_PASSANT': {
      const [origin, destin, piece, captured, notation, promotedTo] = action.payload;
      return [...newState, [origin, destin, piece, captured, notation, promotedTo]];
      break;
    }
    case 'KING_ATTACKED': {
      const finalNotation = newState.slice(-1)[0][4]; 
      const notationWithWarning = `${finalNotation}${action.payload}`;
      newState[newState.length - 1][4] = notationWithWarning;
      return newState;
      break;
    }
  }
  return newState;
};