export default (state = null, action) => {
  switch (action.type) {
    case 'GAME_COMPLETED': 
      return action.payload;
      break;
  }
  return state;
};