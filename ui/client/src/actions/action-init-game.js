const initGame = (white, black, position) => {
  return {
    type: 'GAME_INITIALIZED',
    payload: { white, black, position },
  };
}

export default initGame;