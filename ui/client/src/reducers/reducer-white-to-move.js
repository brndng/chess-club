export default (state = null, action) => {
  switch(action.type) {
    case 'PLAYER_MOVED':
      return state ? false : true;
      break;
    case 'GAME_INITIALIZED':
      const { whiteToMove } = action.payload;
      return whiteToMove;
      break;
  }
  return state;
};
