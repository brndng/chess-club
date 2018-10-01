export default (state = false, action) => {
  switch (action.type) {
    case 'CHECKMATE': {
      return true;
    }
    case 'DRAW': {
      return true;
    }
    case 'RESIGN': {
      return true;
    }
    case 'GAME_INITIALIZED': {
      const { completed } = action.payload;
      return completed;
    }
  }
  return state;
};
