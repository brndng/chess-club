export default (state = null, action) => {
  switch (action.type) {
    case 'CHECKMATE': 
      return action.payload;
      break;
    case 'DRAW': 
      return action.payload;
      break;
    case 'RESIGN': 
      return action.payload;
      break;
    case 'GAME_INITIALIZED':
      const { result } = action.payload;
      return result;
      break;
  }
  return state;
};