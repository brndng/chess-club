export default (state = null, action) => {
  switch(action.type) {
    case 'GAME_COMPLETED': {
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