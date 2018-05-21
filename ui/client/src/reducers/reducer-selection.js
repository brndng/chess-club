export default (state = null, action) => {
  switch (action.type) {
    case 'PIECE_SELECTED': 
      return action.payload;
      break;
  }
  return state;
};

