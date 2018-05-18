export default (state=[], action) => {
  const newState = state.map(row => [...row]);
  switch (action.type) {
    case 'GAME_INITIALIZED': {
      let { position } = action.payload;
      return [...position]; 
      break;
    }
    case 'POSITION_CHANGED': {
      const [ origin, destin, piece ]  = action.payload;
      newState[destin.row][destin.col] = piece;
      newState[origin.row][origin.col] = null;
      return newState;
      break;
    }
    case 'KING_CASTLED': {
      const [ origin, destin, piece ] = action.payload;
      if (piece === 'K') { //white
        if (destin.col === 6) {
          newState[7][6] = piece;
          newState[7][5] = 'R';
          newState[7][4] = null;
          newState[7][7] = null;
        } 
        if (destin.col === 2) {
          newState[7][2] = piece;
          newState[7][3] = 'R';
          newState[7][4] = null;
          newState[7][0] = null;
        }
      }
      if (piece === 'k') { //black
        if (destin.col === 6) {
          newState[0][6] = piece;
          newState[0][5] = 'r';
          newState[0][4] = null;
          newState[0][7] = null;
        } 
        if (destin.col === 2) {
          newState[0][2] = piece;
          newState[0][3] = 'r';
          newState[0][4] = null;
          newState[0][0] = null;
        }
      } 
      return newState;
      break;
    }
    case 'PAWN_PROMOTED': {
      const [ origin, destin, piece ]  = action.payload;
      const queen = piece === 'P'
        ? 'Q'
        : 'q'
      newState[destin.row][destin.col] = queen;
      newState[origin.row][origin.col] = null;
      return newState;
      break;
    }
  }
  return newState;
};











// In your reducer, even though you are assigning the value to a new variable, it just stores a reference to your current state, so when you make a change over that value you are actually mutating your state and redux does not notice that you actually changed it because it needs a new state. Instead do this:
// let newstate = [...state];
// This way you are creating a new array containing all the elements of your current state and this IS A NEW OBJECT, so your redux state will detect the change and will trigger the re-render.


   