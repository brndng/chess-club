import verifyLegalSquare from '../verify-legal-square.js';

export const locateKing = (king, position) => {
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] === king) {
        return { row, col };
      }
    }
  }
};

export const locateAttackers = (userId, white, position, moves, targetSquare, camp) => {
  const attackers = [];

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
          attackers.push({ origin: { row, col }, piece });
        }
      }
    }
  }
  return attackers;
};

export const isSquareAttacked = (userId, white, position, moves, targetSquare, camp) => {
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

export const locateCheckThreats = (userId, white, position, moves) => {
  const king = userId === white ? 'K' : 'k';
  const kingSquare = locateKing(king, position);
  return locateAttackers(userId, white, position, moves, kingSquare, 'enemy');
};

export const isKingInCheck = (userId, white, position, moves) => {
  const king = userId === white ? 'K' : 'k';
  const kingSquare = locateKing(king, position);
  return isSquareAttacked(userId, white, position, moves, kingSquare, 'enemy');
};

export const locateFlightSquares = (userId, white, position, moves) => {
  const flightSquares = [];
  const king = userId === white ? 'K' : 'k';

  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] !== null) {
        const piece = position[row][col];
        const ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
        if (piece !== ally) {
          if (verifyLegalSquare(king, locateKing(king, position), { row, col }, position, moves)) {
            flightSquares.push({ row, col });
          }
        }
      } else {
        if (verifyLegalSquare(king, locateKing(king, position), { row, col }, position, moves)) {
          flightSquares.push({ row, col });
        }
      }
    }
  }

  return flightSquares.filter((square) => {
    if (!isSquareAttacked(userId, white, position, moves, square, 'enemy')) {
      return square;
    }
  });
};

export const willMoveExposeKing = (userId, white, selection, destin, position, moves) => {
  const { origin, piece } = selection;
  const preview = position.map(row => row.slice());

  if (!(piece.toUpperCase() === 'K' && destin.col - origin.col === 2)) {
    preview[origin.row][origin.col] = null;
    preview[destin.row][destin.col] = piece;
    return isKingInCheck(userId, white, preview, moves);
  } else {
    const x = origin.col;

    for (let i = 0; i < 3; i++) {
      let dx = Math.sign(destin.col - origin.col);
      let preview = position.map(row => row.slice());
      dx = dx * i;

      preview[origin.row][origin.col] = null;
      preview[origin.row][x + dx] = piece;
      
      if (isKingInCheck(userId, white, preview, moves)) {
        return true;
      }
    }

    return false;
  }
}

export const canCapture = (userId, white, position, moves, enemySquare) => {
  let canCapture = false;
  const allies = locateAttackers(userId, white, position, moves, enemySquare, 'ally');

  if (allies.length === 0) {
    return false;
  }

  allies.forEach(ally => {
    if (!willMoveExposeKing(userId, white, ally, enemySquare, position, moves)) {
      canCapture = true;
    }
  })

  return canCapture;
};

export const canBlock = (userId, white, position, moves, enemySquare) => {
  let path = [];
  let canBlock = false;
  let { row, col } = enemySquare;
  const king = userId === white ? 'K' : 'k';
  const kingSquare = locateKing(king, position);
  const dy = Math.sign(kingSquare.row - enemySquare.row);
  const dx = Math.sign(kingSquare.col - enemySquare.col);

  while (!(row === kingSquare.row && col === kingSquare.col)) {
    row += dy;
    col += dx;
    path.push({ row, col });
  }

  path = path.slice(0, -1);

  path.forEach((square) => {
    for (let row = 0; row < position.length; row++) {
      for (let col = 0; col < position[row].length; col++) {
        if (position[row][col] !== null) {
          const piece = position[row][col];
          const ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
          if (piece === ally && piece !== king) {
            if (verifyLegalSquare(ally, { row, col }, square, position, moves)) {
              canBlock = true;
              break;
            }
          }
        }
      }
    }
  });
  return canBlock;
};

export const evaluateCheckmateConditions = (userId, white, position, moves) => {
  const flightSquares = locateFlightSquares(userId, white, position, moves);
  const checkThreats = locateCheckThreats(userId, white, position, moves);
  const enemySquare = checkThreats[0].origin;

  // console.log('checkThreats',checkThreats)
  // console.log('flightSquares',flightSquares)
  // console.log('canCapture', canCapture(userId, white, position, moves, enemySquare))
  // console.log('canBlock', canBlock(userId, white, position, moves, enemySquare))

  if (checkThreats.length === 2) { 
    if (flightSquares.length === 0) {
      return true;
    }
  } else {
    if (
      flightSquares.length === 0 
      && !canCapture(userId, white, position, moves, enemySquare) 
      && !canBlock(userId, white, position, moves, enemySquare)
    ) {
      return true;
    }
  }

  return false;
};

export const isPawnPromoting = (selection, destin) => {
  if (
    (selection.piece === 'P' && destin.row === 0)
    || (selection.piece === 'p' && destin.row === 7)
  ) {
    return true;
  }
  return false;
}

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



// export const isSquareAttacked = (userId, white, position, moves, targetSquare, camp) => {
//   return locateAttackers(userId, white, position, moves, targetSquare, 'enemy').length > 0
//     ? true
//     : false
// }

// export const isSquareAttacked = (userId, white, position, moves, targetSquare, camp) => {
//   let isAttacked = false;
//   const king = userId === white ? 'K' : 'k';

//   for (let row = 0; row < position.length; row++) {
//     for (let col = 0; col < position[row].length; col++) {
//       if (position[row][col] !== null) {
//         let piece = position[row][col];
//         let ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
//         let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
//         let attacker = camp === 'ally' ? ally : enemy;
//         if (piece === attacker
//           && verifyLegalSquare(attacker, {row, col}, targetSquare, position, moves) 
//         ) {
//           isAttacked = true;
//           break;
//         }
//       }
//     }
//   }
//   return isAttacked;
// }

// export const isKingInCheck = (userId, white, position, moves) => {
//   let inCheck = false;
//   for (let row = 0; row < position.length; row++) {
//     for (let col = 0; col < position[row].length; col++) { 
//       if (position[row][col] !== null) { 
//         let piece = position[row][col]; 
//         let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
// 				let king = userId === white ? 'K' : 'k';
//         if (piece === enemy) {
//           if(verifyLegalSquare(enemy, {row, col}, locateKing(king, position), position, moves)) {
//             inCheck = true;
//             break;
//           }
//         }
//       }
//     }
//   }
//   return inCheck;
// }

// export const canCapture = (userId, white, position, moves, enemySquare) => {
//   let canCapture = false;
//   for (let row = 0; row < position.length; row++) {
//     for (let col = 0; col < position[row].length; col++) {
//       if (position[row][col] !== null) {
//         let piece = position[row][col];
//         let ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
//         let king = userId === white ? 'K' : 'k';
//         if (piece === ally) {    
//           if (verifyLegalSquare(ally, {row, col}, enemySquare, position, moves)) {
//             canCapture = true;
//             break;
//           }
//         }
//       }
//     }
//   }
//   return canCapture;
// }


// export const locateSquaresOfInterest = (userId, white, position, moves, targetSquare, camp) => {
//   const squares = [];

//   for (let row = 0; row < position.length; row++) {
//     for (let col = 0; col < position[row].length; col++) {
//       if (position[row][col] !== null) {
//         let piece = position[row][col];
//         let ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
//         let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
//         let attacker = camp === 'ally' ? ally : enemy;
//         if (piece === attacker
//           && verifyLegalSquare(attacker, {row, col}, targetSquare, position, moves) 
//         ) {
//           squares.push({piece, coords: {row, col}})
//         }
//       }
//     }
//   }
//   return squares;
// }

// export const locateCheckThreats = (userId, white, position, moves) => {
//   //get list of pieces currently threatening king
//   const threats = [];
//   const king = userId === white ? 'K' : 'k';
  
//   for (let row = 0; row < position.length; row++) {
//     for (let col = 0; col < position[row].length; col++) {
//       if (position[row][col] !== null) {
//         let piece = position[row][col];
//         let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
//         if (piece === enemy) {
//           if(verifyLegalSquare(enemy, {row, col}, locateKing(king, position), position, moves)) {
//             threats.push({row, col});
//           }
//         }
//       }
//     }
//   }
//   return threats;
// }

// console.log('checkThreats',checkThreats)
// console.log('flightSquares',flightSquares)
// console.log('canCapture', canCapture(userId, white, position, moves, enemySquare))
// console.log('canBlock', canBlock(userId, white, position, moves, enemySquare))
