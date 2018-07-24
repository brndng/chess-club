const verifyLegalSquare = require('../movement/');
const { isEqual, isWhite } = require('../utilities');

const locateKing = (king, position) => {
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] === king) {
        return { row, col };
      }
    }
  }
};

const isSquareAttacked = (userId, white, position, moves, targetSquare, camp, squares) => {
  let isAttacked = false;

  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] !== null) {
        const piece = position[row][col];
        const ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
        const enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
        const attacker = camp === 'ally' ? ally : enemy;
        if (
          piece === attacker
          && verifyLegalSquare(attacker, { row, col }, targetSquare, position, moves)
        ) {
          isAttacked = true;
          break;
        }
      }
    }
  }
  return isAttacked;
};

// const isSquareAttacked = (targetSquare, squares) => {
//   const isAttacking = !squares[JSON.stringify(targetSquare)].isAlly
//   for (let coords in squares) {
//     const { piece, candidateSquares, isAlly } = squares[coords];
//     if (piece && isAlly === isAttacking) {
//       for (let square of candidateSquares) {
//         if (isEqual(square, targetSquare)) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// }

const isKingInCheck = (userId, white, position, moves, squares) => {
  const king = userId === white ? 'K' : 'k';
  const kingSquare = locateKing(king, position);  
  return isSquareAttacked(userId, white, position, moves, kingSquare, 'enemy', squares);

  // return isSquareAttacked(kingSquare, squares);
};

const isOpponentInCheck = (userId, white, position, moves, squares) => {
  const king = userId === white ? 'k' : 'K';
  const kingSquare = locateKing(king, position);
  return isSquareAttacked(userId, white, position, moves, kingSquare, 'ally', squares);
  // return isSquareAttacked(kingSquare, squares);
};

const willMoveExposeKing = (userId, white, selection, destin, position, moves, squares) => {
  const { origin, piece } = selection;
  const preview = position.map(row => row.slice());
  const isAlly = ((userId === white) === (piece === piece.toUpperCase()))

  if (isAlly) {
    if (
      !(piece.toUpperCase() === 'K' && destin.col - origin.col === 2)
      && (preview[destin.row][destin.col] !== 'K' && preview[destin.row][destin.col] !== 'k')
      ) {
      preview[origin.row][origin.col] = null;
      preview[destin.row][destin.col] = piece;
      if (destin.row === 1 && destin.col === 3) {
      }
      return isKingInCheck(userId, white, preview, moves, squares);
    } else {
      const x = origin.col;
  
      for (let i = 0; i < 3; i++) {
        let dx = Math.sign(destin.col - origin.col);
        let preview = position.map(row => row.slice());
        dx = dx * i;
  
        preview[origin.row][origin.col] = null;
        preview[origin.row][x + dx] = piece;
        if (isKingInCheck(userId, white, preview, moves, squares)) {
          return true;
        }
      }
  }
    return false;
  }
}

const willMoveGiveCheck = (userId, white, selection, destin, position, moves, squares, promotedTo = null) => {
  const { origin, piece } = selection;
  const preview = position.map(row => row.slice());

  if (promotedTo !== null) {
    preview[destin.row][destin.col] = promotedTo;
    preview[origin.row][origin.col] = null;
    return isOpponentInCheck(userId, white, preview, moves, squares);
  }

  if (!(piece.toUpperCase() === 'K' && destin.col - origin.col === 2)) {
    preview[origin.row][origin.col] = null;
    preview[destin.row][destin.col] = piece;
    return isOpponentInCheck(userId, white, preview, moves, squares);
  } else {
    if (userId === white) { 
      if (destin.col === 6) {
        preview[7][6] = piece;
        preview[7][5] = 'R';
        preview[7][4] = null;
        preview[7][7] = null;
      } else {
        preview[7][2] = piece;
        preview[7][3] = 'R';
        preview[7][4] = null;
        preview[7][0] = null;
      }
    } else { 
      if (destin.col === 6) {
        preview[0][6] = piece;
        preview[0][5] = 'r';
        preview[0][4] = null;
        preview[0][7] = null;
      } else {
        preview[0][2] = piece;
        preview[0][3] = 'r';
        preview[0][4] = null;
        preview[0][0] = null;
      }
    } 
    return isOpponentInCheck(userId, white, preview, moves, squares) 
  }
}

const isCheckmate = (squares) => {
  for (let coords in squares) {
    const { piece, candidateSquares, isAlly } = squares[coords];
    if (isAlly && candidateSquares.length > 0) {
      return false;
    }
  }
  return true;
}

const isPawnPromoting = (selection, destin) => {
  if (
    (selection.piece === 'P' && destin.row === 0)
    || (selection.piece === 'p' && destin.row === 7)
  ) {
    return true;
  }
  return false;
}

const getCandidateSquares = (userId, white, piece, origin, position, moves, prevSquares) => {
  const candidateSquares = [];

  if (piece === null) {
    return candidateSquares;
  }

  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      const destin = { row, col };
      if (
        verifyLegalSquare(piece, origin, destin, position, moves)
        && (isWhite(piece) !== isWhite(position[row][col]))
        && !willMoveExposeKing(userId, white, { origin, piece }, destin, position, moves, prevSquares)
      ) {
        candidateSquares.push(destin);
      }
    }
  }
  return candidateSquares;
}

const isCandidate = (coords, candidateSquares) => {
  let isCandidate = false;

  candidateSquares.forEach(square => {
    if (isEqual(square, coords)) {
      isCandidate = true;
      return isCandidate;
    }
  });

  return isCandidate;
}

module.exports = { 
  locateKing, 
  isSquareAttacked, 
  isKingInCheck, 
  isOpponentInCheck,
  willMoveExposeKing,
  willMoveGiveCheck, 
  isPawnPromoting,
  getCandidateSquares,
  isCandidate,
  isCheckmate,
}
