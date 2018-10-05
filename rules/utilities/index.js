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
  p: { symbol: '♟', value: 0 },
  n: { symbol: '♞', value: 1 },
  b: { symbol: '♝', value: 2 },
  r: { symbol: '♜', value: 3 },
  q: { symbol: '♛', value: 4 },
  k: { symbol: '♚', value: 5 },
  P: { symbol: '♙', value: 0 },
  N: { symbol: '♘', value: 1 },
  B: { symbol: '♗', value: 2 },
  R: { symbol: '♖', value: 3 },
  Q: { symbol: '♕', value: 4 },
  K: { symbol: '♔', value: 5 }
}

const chessmen = {
  p: { symbol: '♟', color: 'piece black' },
  n: { symbol: '♞', color: 'piece black' },
  b: { symbol: '♝', color: 'piece black' },
  r: { symbol: '♜', color: 'piece black' },
  q: { symbol: '♛', color: 'piece black' },
  k: { symbol: '♚', color: 'piece black' },
  P: { symbol: '♟', color: 'piece white' },
  N: { symbol: '♞', color: 'piece white' },
  B: { symbol: '♝', color: 'piece white' },
  R: { symbol: '♜', color: 'piece white' },
  Q: { symbol: '♛', color: 'piece white' },
  K: { symbol: '♚', color: 'piece white' },
}

const convertToChessNotation = (origin, destin, piece, captured, check, promotedTo = null) => {
  const originFile = String.fromCharCode(97 + origin.col);
  const file = String.fromCharCode(97 + destin.col);
  const rank = 8 - destin.row;

  if (
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
    ? '﹢'
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

const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (typeof a !== 'object' && typeof b !== 'object') {
    return a === b;
  } else {
    return false;
  }
}

const setSquareColor = (coords) => {
  const { row, col } = coords;
  return ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0))
    ? 'white'
    : 'black';
}

const initialPosition = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
]

const initSquareDetails = (initialPosition) => {
  const squares = {};
  for (let i = 0; i < initialPosition.length; i++) {
    for (let j = 0; j < initialPosition[i].length; j++) {
      const coords = JSON.stringify({ row: i, col: j });
      const piece = initialPosition[i][j];
      const candidateSquares = [];
      squares[coords] = { piece, candidateSquares };
    }
  }

  return squares;
}

const initialSquares = initSquareDetails(initialPosition);

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

const isPawn = (piece) => {
  if (piece.toLowerCase() === 'p') return true;
  return false;
}
const isKnight = (piece) => {
  if (piece.toLowerCase() === 'n') return true;
  return false;
}
const isBishop = (piece) => {
  if (piece.toLowerCase() === 'b') return true;
  return false;
}
const isRook = (piece) => {
  if (piece.toLowerCase() === 'r') return true;
  return false;
}
const isQueen = (piece) => {
  if (piece.toLowerCase() === 'q') return true;
  return false;
}
const isKing = (piece) => {
  if (piece.toLowerCase() === 'k') return true;
  return false;
}

const isCastling = (piece, origin, destin) => {
  return piece.toLowerCase() === 'k' && Math.abs(destin.col - origin.col) === 2;
}

const isLegalCastle = (piece, origin, destin, moves) => {
  let rook = getCastleSideRook(piece, origin, destin);
  for (let i = 0; i < moves.length - 1; i++) {
    let [pastOrigin, pastDestin, pastPiece] = moves[i];
    if (
      isEqual(pastPiece, piece)
      || (isEqual(rook.row, pastOrigin.row) && isEqual(rook.col, pastOrigin.col))
    ) {
      return false;
    }
  }
  return true;
}

const getCastleSideRook = (piece, origin, destin) => {
  let rook;
  if (isWhite(piece)) {
    destin.col - origin.col > 0
      ? rook = { row: 7, col: 7 }
      : rook = { row: 7, col: 0 }
  } else {
    destin.col - origin.col > 0
      ? rook = { row: 0, col: 7 }
      : rook = { row: 0, col: 0 }
  }
  return rook;
}

const isDiagonalPawnMove = (piece, origin, destin) => {
  const colDistance = destin.col - origin.col;
  const rowDistance = destin.row - origin.row;

  return isPawn(piece)
    && (Math.abs(colDistance) === 1)
    && ((isWhite(piece) && rowDistance === -1) || (!isWhite(piece) && rowDistance === 1));
}

const isSquareOccupied = (position, row, col) => {
  return position[row][col] !== null;
}

const isEnPassant = (piece, origin, destin, position, moves) => {
  const _isDiagonalPawnMove = isDiagonalPawnMove(piece, origin, destin);
  const _isSquareOccupied = isSquareOccupied(position, destin.row, destin.col);
  const prevMove = moves.slice(-1)[0];

  if (prevMove) {
    const [prevOrigin, prevDestin, prevPiece] = prevMove;
    const isEnemyPawn = isPawn(piece) && isPawn(prevPiece) && (piece !== prevPiece);
    const startsSameRow = prevDestin.row === origin.row;
    const endsSameCol = prevDestin.col === destin.col;
    const prevPieceMovedTwoSquares = Math.abs(prevDestin.row - prevOrigin.row) === 2

    if (
      _isDiagonalPawnMove
      && !_isSquareOccupied
      && startsSameRow
      && endsSameCol
      && prevPieceMovedTwoSquares
    ) {
      return true;
    }
  }
  return false;
}

const isAlly = (pieceToMove, pieceAtDestin) => {
  if (!pieceAtDestin) return false;
  return isWhite(pieceToMove) === isWhite(pieceAtDestin);
}

const hasExceptions = (piece) => {
  return !isPawn(piece) || !isKing(piece);
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
  isEqual,
  setSquareColor,
  initialPosition,
  printRanks,
  printFiles,
  formatDate,
  genRandomColor,
  initialSquares,
  isPawn,
  isKnight,
  isBishop,
  isRook,
  isQueen,
  isKing,
  isCastling,
  getCastleSideRook,
  isDiagonalPawnMove,
  isSquareOccupied,
  isEnPassant,
  isAlly,
  hasExceptions,
  isLegalCastle
}
