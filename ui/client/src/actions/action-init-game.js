const initGame = (white, black, board) => {
  return {
    type: 'GAME_INITIALIZED',
    payload: { white, black, board },
  };
}

export default initGame;