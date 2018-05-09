const initGame = (id, white, black, position, whiteToMove) => {
  return {
    type: 'GAME_INITIALIZED',
    payload: { id, white, black, position, whiteToMove },
  };
}

export default initGame;