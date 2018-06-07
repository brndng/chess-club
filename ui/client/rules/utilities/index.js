export const isWhite = (piece) => {
  if (piece === null) {
    return null;
  }
  return piece === piece.toUpperCase();
};

export const rotateBoard = (position) => {
  const copy = position.map(row => [...row]);
  return copy.reverse().map(row => row.reverse());
};

export const convertToChessNotation = (origin, destin, piece, captured, check) => {
  const figurines = {
    K: '♔',
    Q: '♕',
    R: '♖',
    B: '♗',
    N: '♘',
  }
  const originFile = String.fromCharCode(97 + origin.col);
  const file = String.fromCharCode(97 + destin.col);
  const rank = 8 - destin.row;

  // en passant case
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
    : figurines[piece.toUpperCase()];
  const captures = captured !== null
    ? 'x'
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

  return `${selection}${captures}${file}${rank}${warning}`
};

export const printMoves = (moves) => {
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

export const isCapturedPiece = (userId, game, piece) => {
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

export const printCapturedPieces = (userId, game, moves) => {
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

export const areEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const setSquareColor = (coords) => {
  const { row, col } = coords;
    return ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0))
      ? 'white' 
      : 'black';
}




