const initGame = (id, white, black, position, whiteToMove, moves) => {
  return {
    type: 'GAME_INITIALIZED',
    payload: { id, white, black, position, whiteToMove, moves },
  };
}

export default initGame;