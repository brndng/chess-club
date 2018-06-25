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
  p: { symbol:'♟', value: 0},
  n: { symbol:'♞', value: 1},
  b: { symbol:'♝', value: 2},
  r: { symbol:'♜', value: 3},
  q: { symbol:'♛', value: 4},
  k: { symbol:'♚', value: 5},
  P: { symbol:'♙', value: 0},
  N: { symbol:'♘', value: 1},
  B: { symbol:'♗', value: 2},
  R: { symbol:'♖', value: 3},
  Q: { symbol:'♕', value: 4},
  K: { symbol:'♔', value: 5}
}

const chessmen = {
  p: {symbol: '♟', color: 'piece black'},
  n: {symbol: '♞', color: 'piece black'},
  b: {symbol: '♝', color: 'piece black'},
  r: {symbol: '♜', color: 'piece black'},
  q: {symbol: '♛', color: 'piece black'},
  k: {symbol: '♚', color: 'piece black'},
  P: {symbol: '♟', color: 'piece white'},
  N: {symbol: '♞', color: 'piece white'},
  B: {symbol: '♝', color: 'piece white'},
  R: {symbol: '♜', color: 'piece white'},
  Q: {symbol: '♛', color: 'piece white'},
  K: {symbol: '♚', color: 'piece white'},
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
    : figurines[piece.toUpperCase()].symbol;
  const captures = captured !== null
    ? '⨉'
    : '';
  const promotion = promotedTo !== null
    ? `=${figurines[promotedTo].symbol}`
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

const printMoves = (moves, index) => {
  const movePairs = [];
  const currMoves = moves.map(move => [...move]).slice(0, index + 1);

  if (currMoves.length === 0) {
    return movePairs;
  }
  
  for (let i = 0; i <= index; i += 2) {    
    if (!currMoves[i + 1]) {
      movePairs.push([currMoves[i][4], '']);
    } else {
      movePairs.push([currMoves[i][4], currMoves[i + 1][4]]);
    }
    if (!currMoves[i + 2]) {
      break;
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

const printCapturedPieces = (userId, game, moves, index) => {
  const pieces = [];
  currMoves = moves.map(move => [...move]).slice(0, index + 1);
  
  currMoves.forEach(move => {
    const piece = move[3];
    if (isCapturedPiece(userId, game, piece)) {
      pieces.push(figurines[piece]);
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

const printRanks = (userId, white) => {
  const ranks = userId === white 
  ? [8, 7, 6, 5, 4, 3, 2, 1]
  : [1, 2, 3, 4, 5, 6, 7, 8];

  return ranks;
}

const printFiles = (userId, white) => {
  const files = userId === white
  ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];

  return files;
}

const formatDate = (input) => {
  const year = input.slice(0, 4);
  const month = input.slice(5, 7);
  const day = input.slice(8, 10);
  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  }
  return `${months[month]} ${day} ${year}`;
}

const genRandomColor = () => {
  const color = Math.random() < 0.5 ? 'white' : 'black';
  return color;
}

module.exports = { 
  isWhite, 
  rotateBoard, 
  figurines, 
  chessmen,
  convertToChessNotation, 
  printMoves, 
  isCapturedPiece, 
  printCapturedPieces, 
  areEqual, 
  setSquareColor, 
  initialPosition,
  printRanks,
  printFiles,
  formatDate,
  genRandomColor,
 }




