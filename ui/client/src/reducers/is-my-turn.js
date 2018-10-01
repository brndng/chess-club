export default (state = null, action) => {

  switch (action.type) {
    case 'PLAYER_MOVED': {
      const { userId, white, prevWhiteToMove } = action.payload;
      const whiteToMove = !prevWhiteToMove;
      return (
        (userId === white && whiteToMove)
        || (userId !== white && !whiteToMove)
      );
    }
    case 'GAME_INITIALIZED': {
      const { userId, white, whiteToMove } = action.payload;
      return (
        (userId === white && whiteToMove)
        || (userId !== white && !whiteToMove)
      );
    }
    case 'SNAPSHOT_CHANGED': {
      const { userId, white, index } = action.payload;
      const whiteToMove = (index % 2 === 0);
      return (
        (userId === white && whiteToMove)
        || (userId !== white && !whiteToMove)
      );
    }
  }
  return state;
};