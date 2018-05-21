export default (state = null, action) => {
  switch(action.type) {
    case 'CHECK_STATUS_UPDATED': {
      return action.payload;
      break;
    }
    case 'GAME_INITIALIZED': {
      const { inCheck } = action.payload;
      return inCheck;
      break;
    }
  }
  return state;
};
