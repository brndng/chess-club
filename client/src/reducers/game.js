export default (state = null, action) => {
  switch (action.type) {
    case 'GAME_INITIALIZED':
      return action.payload;
  }
  return state;
};
