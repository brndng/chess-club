// import willMoveGiveCheck from '../interactions/';

const isWhite = (piece) => {
  if (piece === null) {
    return null;
  }
  return piece === piece.toUpperCase();
};

const rotateBoard = (position) => {
  const copy = position.map(row => [...row]);
  return copy.reverse().map(row => row.reverse());
};

const figurines = {
  K: '♔',
  Q: '♕',
  R: '♖',
  B: '♗',
  N: '♘',
}

const convertToChessNotation = (origin, destin, piece, captured, check, promotedTo = null) => {
  const originFile = String.fromCharCode(97 + origin.col);
  const file = String.fromCharCode(97 + destin.col);
  const rank = 8 - destin.row;
  
  if ( // en passant case
    piece.toUpperCase() === 'P' 
    && captured === null 
    && Math.abs(destin.col - origin.col) === 1 
    && Math.abs(destin.row - origin.row) === 1
  ) { 
    captured = piece === piece.toUpperCase() 
      ? 'p'
      : 'P'
  }
  const selection = piece.toUpperCase() === 'P'
    ? captured === null
      ? ''
      : originFile
    : figurines[piece.toUpperCase()];
  const captures = captured !== null
    ? '⨉'
    : '';
  const promotion = promotedTo !== null
    ? `=${promotedTo}`
    : '';
  const warning = check 
    ? '+'
    : '';

  if (selection === '♔') {
    if (destin.col - origin.col === 2) {
      return `O-O`;
    } else if (destin.col - origin.col === -2) {
      return `O-O-O`;
    }
  }

  return `${selection}${captures}${file}${rank}${promotion}${warning}`
};

const printMoves = (moves) => {
  const movePairs = [];

  for (let i = 0; i < moves.length; i += 2) {
    if (!moves[i + 1]) {
      movePairs.push([moves[i][4], '']);
    } else {
      movePairs.push([moves[i][4], moves[i + 1][4]]);
    }
  }
  return movePairs;
}

const isCapturedPiece = (userId, game, piece) => {
  let isEnemy = false;
  
  if (userId === game.white) {
    if (piece !== null && piece === piece.toLowerCase()) {
      isEnemy = true;
    }
  } else {
    if (piece !== null && piece === piece.toUpperCase()) {
      isEnemy = true;
    }
  }

  return isEnemy;
}

const printCapturedPieces = (userId, game, moves) => {
  const chessmen = {
    p: { symbol:'♟', value: 0},
    n: { symbol:'♞', value: 1},
    b: { symbol:'♝', value: 2},
    r: { symbol:'♜', value: 3},
    q: { symbol:'♛', value: 4},
    P: { symbol:'♙', value: 0},
    N: { symbol:'♘', value: 1},
    B: { symbol:'♗', value: 2},
    R: { symbol:'♖', value: 3},
    Q: { symbol:'♕', value: 4},
  }
  const pieces = [];
  
  moves.forEach(move => {
    const piece = move[3];
    if (isCapturedPiece(userId, game, piece)) {
      pieces.push(chessmen[piece]);
    }
  });

  pieces.sort((a, b) => a.value - b.value);
  return pieces.map(piece => piece.symbol);
}

const areEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const setSquareColor = (coords) => {
  const { row, col } = coords;
    return ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0))
      ? 'white' 
      : 'black';
}

const initialPosition = [ 
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
]

module.exports = { 
  isWhite, 
  rotateBoard, 
  figurines, 
  convertToChessNotation, 
  printMoves, 
  isCapturedPiece, 
  printCapturedPieces, 
  areEqual, 
  setSquareColor, 
  initialPosition }

// export const convertToChessNotation = (user, game, currentPosition, moves, selection, destin, captured, promotedTo = null) => {
//   const { origin, piece } = selection;
//   const originFile = String.fromCharCode(97 + origin.col);
//   const file = String.fromCharCode(97 + destin.col);
//   const rank = 8 - destin.row;
//   const _check = willMoveGiveCheck(user.id, game.white, selection, destin, currentPosition, moves, promotedTo);
  
//   if ( 
//     piece.toUpperCase() === 'P' 
//     && captured === null 
//     && Math.abs(destin.col - origin.col) === 1 
//     && Math.abs(destin.row - origin.row) === 1
//   ) { 
//     captured = piece === piece.toUpperCase() 
//       ? 'p'
//       : 'P'
//   }
//   const pieceToMove = piece.toUpperCase() === 'P'
//     ? captured === null
//       ? ''
//       : originFile
//     : figurines[piece.toUpperCase()];
//   const captures = captured !== null
//     ? 'x'
//     : '';
//   const promotion = promotedTo !== null
//     ? `=${promotedTo}`
//     : '';
//   const warning = _check 
//     ? '+'
//     : '';

//   if (pieceToMove === '♔') {
//     if (destin.col - origin.col === 2) {
//       return `O-O`;
//     } else if (destin.col - origin.col === -2) {
//       return `O-O-O`;
//     }
//   }

//   return `${pieceToMove}${captures}${file}${rank}${promotion}${warning}`
// };




