export default (state = [], action) => {
  const newState = state.map(row => [...row]);
  switch(action.type) {
    case 'GAME_INITIALIZED': {
      let { moves } = action.payload;
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
      let [ origin, destin, piece, captured ] = action.payload;
      return [...newState, [ origin, destin, piece, captured ]];
      break;
    }
  }
  return newState;
};