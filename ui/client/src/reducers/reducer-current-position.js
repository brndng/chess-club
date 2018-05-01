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
    case 'POSITION_CHANGED': 
      console.log('\tPOSITION_CHANGED -- sub-state:', state);
      const { rowStart, colStart, rowEnd, colEnd, pieceToMove } = action.payload;
        state[rowEnd][colEnd] = pieceToMove;
        state[rowStart][colStart] = null;
        return state;
    break;
  }
  return state;
};


   