export default (state = null, action) => {
  switch (action.type) {
    case 'CHECKMATE':
      return action.payload;
    case 'DRAW':
      return action.payload;
    case 'RESIGN':
      return action.payload;
    case 'GAME_INITIALIZED':
      const { result } = action.payload;
      return result;
  }
  return state;
};
