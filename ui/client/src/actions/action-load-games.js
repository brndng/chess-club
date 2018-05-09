const loadGames = (games) => {
  return {
    type: 'GAMES_ACCESSED',
    payload: games
  };
}

export default loadGames;