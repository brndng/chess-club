const init = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

export default (state=init, action) => {
  const newState = [...state];
  switch (action.type) {
    case 'POSITION_CHANGED': {
      let [ rowStart, colStart, rowEnd, colEnd, pieceToMove ] = action.payload;
      newState[rowEnd][colEnd] = pieceToMove;
      newState[rowStart][colStart] = null;
      return newState;
      break;
    }
    case 'GAME_INITIALIZED': {
      let { position } = action.payload;
      return [...position];
      break;
    }
    // case 'CASTLING': {
    //   // console.log('\tCASTLING -- sub-state:', state);
    //   let [ rowStart, colStart, rowEnd, colEnd, pieceToMove ] = action.payload;
    //   if (rowStart === 0) {
    //     if (colEnd === 6) {
    //       newState[0][6] = 'k';
    //       newState[0][5] = 'r';
    //       newState[0][4] = null;
    //       newState[0][7] = null;
    //     } 
    //     if (colEnd === 2) {
    //       newState[0][2] = 'k';
    //       newState[0][3] = 'r';
    //       newState[0][4] = null;
    //       newState[0][0] = null;
    //     }
    //   } 
    //   if (rowStart === 7) {
    //     if (colEnd === 6) {
    //       newState[7][6] = 'K';
    //       newState[7][5] = 'R';
    //       newState[7][4] = null;
    //       newState[7][7] = null;
    //     } 
    //     if (colEnd === 2) {
    //       newState[7][2] = 'K';
    //       newState[7][3] = 'R';
    //       newState[7][4] = null;
    //       newState[7][0] = null;
    //     }
    //   }
    //   return newState;
    //   break;
    // }
  }
  return newState;
};

// In your reducer, even though you are assigning the value to a new variable, it just stores a reference to your current state, so when you make a change over that value you are actually mutating your state and redux does not notice that you actually changed it because it needs a new state. Instead do this:
// let newstate = [...state];
// This way you are creating a new array containing all the elements of your current state and this IS A NEW OBJECT, so your redux state will detect the change and will trigger the re-render.


   