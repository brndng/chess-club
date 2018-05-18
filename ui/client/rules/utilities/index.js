import verifyLegalSquare from '../verify-legal-square.js';
import validatePath from '../validate-path.js';

export const locateKing = (king, position) => {
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] === king) {
        return {row, col};
      }
    }
  }
}

export const isWhite = (piece) => {
  return piece === null 
    ? null 
    : piece === piece.toUpperCase() 
      ? true 
      : false;
} 

export const rotateBoard = (position) => {
  const copy = position.map(row => [...row]);
  return copy.reverse().map(row => row.reverse());
}
  
export const isKingInCheck = (userId, white, position, moves) => {
  let inCheck = false;
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) { 
      if (position[row][col] !== null) { 
        let piece = position[row][col]; 
        let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
				let king = userId === white ? 'K' : 'k';
        if (piece === enemy) {
          if(verifyLegalSquare(enemy, {row, col}, locateKing(king, position), position, moves)) {
            inCheck = true;
            break;
          }
        }
      }
    }
  }
  return inCheck;
}

export const locateCheckThreats = (userId, white, position, moves) => {
  //get list of pieces currently threatening king
  const threats = [];
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] !== null) {
        let piece = position[row][col];
        let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
				let king = userId === white ? 'K' : 'k';
        if (piece === enemy) {
          if(verifyLegalSquare(enemy, {row, col}, locateKing(king, position), position, moves)) {
            threats.push({piece, coords: {row, col}});
          }
        }
      }
    }
  }
  return threats;
}

export const locateFlightSquares = (userId, white, position, moves) => {
  //get list of legal flight squares for king
  const flightSquares = [];
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      let piece = position[row][col];
      let king = userId === white ? 'K' : 'k';
      if (piece === null) {
        if (verifyLegalSquare(king, locateKing(king, position), {row, col}, position, moves)) {
          flightSquares.push({row, col});
        }
      } else {
        let ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
        if (piece !== ally) {
          if (verifyLegalSquare(king, locateKing(king, position), {row, col}, position, moves)) {
            flightSquares.push({row, col});
          }
        }
      }
    }
  }

  return flightSquares.filter(square => {
    if (!isSquareAttacked(userId, white, position, moves, square)) {
      return square;
    }
  });
  
  // return flightSquares.filter(square => {
  //   let isAttacked = false;
  //   for (let row = 0; row < position.length; row++) {
  //     for (let col = 0; col < position[row].length; col++) {
  //       if (position[row][col] !== null) {
  //         let piece = position[row][col];
  //         let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
  //         if (piece === enemy) {
  //           if (verifyLegalSquare(enemy, {row, col}, square, position, moves)) {
  //             isAttacked = true;
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (!isAttacked) {
  //     return square;
  //   }
  // });
}

export const isSquareAttacked = (userId, white, position, moves, square) => {
  let isAttacked = false;

  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] !== null) {
        let piece = position[row][col];
        let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
        if (piece === enemy
          && verifyLegalSquare(enemy, {row, col}, square, position, moves) 
        ) {
          isAttacked = true;
          break;
        }
      }
    }
  }

  return isAttacked;
}

export const canCapture = (userId, white, position, moves, enemySquare) => {
  let canCapture = false;
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      if (position[row][col] !== null) {
        let piece = position[row][col];
        let ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
        let king = userId === white ? 'K' : 'k';
        if (piece === ally) {    
          if (verifyLegalSquare(ally, {row, col}, enemySquare, position, moves)) {
            canCapture = true;
            break;
          }
        }
      }
    }
  }
  return canCapture;
}

export const canBlock = (userId, white, position, moves, enemySquare) => {
  let canBlock = false;
  let path = [];
  let king = userId === white ? 'K' : 'k';
  let kingSquare = locateKing(king, position);
  let { row, col } = enemySquare;
  let dy = Math.sign(kingSquare.row-enemySquare.row);
  let dx = Math.sign(kingSquare.col-enemySquare.col); 

  while (!(row === kingSquare.row && col === kingSquare.col)) {
    row += dy;
    col += dx;
    path.push({row, col});
  }

  path = path.slice(0,-1);

  path.forEach(square => {
    for (let row = 0; row < position.length; row++) {
      for (let col = 0; col < position[row].length; col++) {
        if (position[row][col] !== null) {
          let piece = position[row][col];
          let ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
          if (piece === ally && piece !== king) {
            if (verifyLegalSquare(ally, {row, col}, square, position, moves)) {
              canBlock = true;
              break;
            }
          }
        }
      }
    }
  })
  return canBlock;
}

export const confirmCheckmate = (userId, white, position, moves) => {
  const flightSquares = locateFlightSquares(userId, white, position, moves);
  const checkThreats = locateCheckThreats(userId, white, position, moves);
  const enemyCoords = checkThreats[0].coords;
  
  console.log('flightSquares', flightSquares)
  if (checkThreats.length === 2) {
    if (flightSquares.length === 0) {
      return true;
    }
  } else {
    if (
      flightSquares.length === 0 
      && !canCapture(userId, white, position, moves, enemyCoords) 
      && !canBlock(userId, white, position, moves, enemyCoords)
    ) {
      return true;
    }
  }
  return false;
}



