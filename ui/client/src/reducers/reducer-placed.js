export default (state=false, action) => {
  console.log('placed', state)
  switch (action.type) {
    case 'PIECE_PLACED': 
      return state ? false : true;
      break;
  }
  return state;
};