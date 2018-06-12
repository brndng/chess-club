export default (state = false, action) => {
  switch(action.type) {
    case 'CHECKMATE': {
      return true;
      break;
    }
    case 'DRAW': {
      return true;
      break;
    }
    case 'RESIGN': {
      return true;
      break;
    }
    case 'GAME_INITIALIZED': {
      const { completed } = action.payload;
      return completed;
      break;
    }
  }
  return state;
};