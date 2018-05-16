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
  
export const isKingInCheck = (userId, white, position) => {
  let inCheck = false;
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) { 
      if (position[row][col] !== null) { 
        let piece = position[row][col]; 
        let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
				let king = userId === white ? 'K' : 'k';
        if (piece === enemy) {
          if(verifyLegalSquare(enemy, {row, col}, locateKing(king, position), position)) {
            inCheck = true;
            break;
          }
        }
      }
    }
  }
  return inCheck;
}

export const lookupSquare = (square, position) => {
  return position[square.row][square.col];
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

export const locateCheckThreats = (userId, white, position) => {
  //get list of pieces currently threatening king
  const threats = [];
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      let piece = position[row][col];
      if (piece !== null) {
        let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
				let king = userId === white ? 'K' : 'k';
        if (piece === enemy) {
          if(verifyLegalSquare(enemy, {row, col}, locateKing(king, position), position)) {
            threats.push(piece);
          }
        }
      }
    }
  }
  return threats;
}

export const locateFlightSquares = (userId, white, position) => {
  //get list of legal flight squares for king
  const flightSquares = [];
  for (let row = 0; row < position.length; row++) {
    for (let col = 0; col < position[row].length; col++) {
      let piece = position[row][col];
      let king = userId === white ? 'K' : 'k';
      if (piece === null) {
        if (verifyLegalSquare(king, locateKing(king, position), {row, col}, position)) {
          flightSquares.push({row, col});
        }
      } else {
        let ally = userId === white ? piece.toUpperCase() : piece.toLowerCase();
        if (piece !== ally) {
          if (verifyLegalSquare(king, locateKing(king, position), {row, col}, position)) {
            flightSquares.push({row, col});
          }
        }
      }
    }
  }
  
  return flightSquares.filter(square => {
    let isAttacked = false;
    for (let row = 0; row < position.length; row++) {
      for (let col = 0; col < position[row].length; col++) {
        if (position[row][col] !== null) {
          let piece = position[row][col];
          let enemy = userId === white ? piece.toLowerCase() : piece.toUpperCase();
          if (piece === enemy) {
            if (verifyLegalSquare(piece, {row, col}, square, position)) {
              isAttacked = true;
            }
          }
        }
      }
    }
    if (!isAttacked) {
      return square;
    }
  });
}


