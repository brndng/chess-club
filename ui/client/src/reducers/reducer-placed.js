export default (state=false, action) => {
  switch (action.type) {
    case 'PIECE_PLACED': 
      return state ? false : true;
      break;
  }
  return state;
};