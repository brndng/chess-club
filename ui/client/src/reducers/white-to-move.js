export default (state = null, action) => {
  const newState = state;
  switch (action.type) {
    case 'PLAYER_MOVED':
      return newState ? false : true;
    case 'GAME_INITIALIZED':
      const { whiteToMove } = action.payload;
      return whiteToMove;
  }
  return newState;
};
