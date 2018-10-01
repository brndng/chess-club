export default (state = [], action) => {
  switch (action.type) {
    case 'GAMES_ACCESSED': 
      return action.payload;
      break;
  }
  return state;
};
