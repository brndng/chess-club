export default (state = null, action) => {
  const newState = state;
  switch(action.type) {
    case 'PLAYER_MOVED':
      console.log('playermoved reducer- newState ? false : true;', newState ? false : true)
      return newState ? false : true;
      break;
    case 'GAME_INITIALIZED':
      const { whiteToMove } = action.payload;
      console.log('​playermoved reducer GAME_INITIALIZED whiteToMove', whiteToMove);
      return whiteToMove;
      break;
  }
  return newState;
};
