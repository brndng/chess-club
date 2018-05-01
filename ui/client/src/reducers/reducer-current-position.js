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
  switch (action.type) {
    case 'POSITION_CHANGED': {
      console.log('\tPOSITION_CHANGED -- sub-state:', state);
      let { rowStart, colStart, rowEnd, colEnd, pieceToMove } = action.payload;
      state[rowEnd][colEnd] = pieceToMove;
      state[rowStart][colStart] = null;
      return state;
      break;
    }
      
    case 'CASTLE': {
      console.log('entering CASTLE CASE')
      let { rowStart, rowEnd, colStart, colEnd } = action.payload;
      // console.log('am I getting these', rowStart, rowEnd, colStart, colEnd)
      if (rowStart === 0) {
        if (colEnd === 6) {
          state[0][6] = 'k';
          state[0][5] = 'r';
        } 
        if (colEnd === 2) {
          state[0][2] = 'k';
          state[0][3] = 'r';
        }
      } 
      if (rowStart === 7) {
        if (colEnd === 6) {
          state[7][6] = 'K';
          state[7][5] = 'R';
        } 
        if (colEnd === 2) {
          state[7][2] = 'K';
          state[7][3] = 'R';
        }
      }
      return state;
      break;
    }
      
  }
  return state;
};


   