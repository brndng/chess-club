import verifyLegalSquare from '../verify-legal-square.js';

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
      let piece = position[row][col];
      if (piece !== null) {
        let opponentPiece = userId === white ? piece.toLowerCase() : piece.toUpperCase();
				let king = userId === white ? 'K' : 'k';
        if (piece === opponentPiece) {
          if(verifyLegalSquare(opponentPiece, {row, col}, locateKing(king, position), position)) {
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
  const copy = position.map(row => [...row])
  copy.reverse().forEach(row => row.reverse());
  return copy;
}








//function isSquareUnderAttack, //CB = verifyLegalSquares
//Im playing white
//iterate through MATRIX, squares that contain black pieces
//[...pieces].forEach(piece)
  //to check if king is in check
  //CB(piece, origin, kingssquare, MATRIX)
//takes in matrix, origin, destination, piece
//IF NOW and WOULD BE (preview) for ONE SQUARE

//then perform on all King's Squares
//findCandidateSquares for KING
  //CB ==> [...candidates]

//Checkmate
//overlap between king's candidates and isSquareUnderAttack
//remove piece
//block path

//king still in check?

// const getKingsCandidateSquares = (cb, origin, matrix) => {
//   const candidates = [];
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (cb('K', origin, [i,j], matrix)) {
//         candidates.push([i,j]);
//       }
//     }
//   }
//   return candidates;
// }

// const filter = () => {
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (matrix[i][j] !== null) {
//         'candidates'.map(square => !cb('K', [i,j], 'kingssquare', matrix))
//       }
//     }
//   }
// }

