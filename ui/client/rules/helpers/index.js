  // TODO: there must be a better way
import verifyLegalSquare from '../verify-legal-square.js';

const findKingSquare = (king, matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === king) {
        return [i,j];
      }
    }
  }
}

const isWhite = (piece) => {
  return piece === null ? null :
    piece === piece.toUpperCase() ? true : false;
}

const inCheck = (kingSquare, matrix, color, cb) => {
  let inCheck = false;

  if (color === 'white') {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== null && matrix[i][j] === matrix[i][j].toLowerCase()) {
          let oppPiece = matrix[i][j];
          if(cb(oppPiece, [i,j], kingSquare, matrix)) {
            inCheck = true;
          }
        }
      }
    }

  }
  if (color === 'black') {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== null && matrix[i][j] === matrix[i][j].toUpperCase()) {
          let oppPiece = matrix[i][j];
          if(cb(oppPiece, [i,j], kingSquare, matrix)) {
            inCheck = true;
          }
        }
      }
    }
  }
  return inCheck;
}

const isKingInCheck = (userId, white, position) => {
  if(userId === white) { 
    let kingSquare = findKingSquare('K', position)
    let params = [kingSquare, position, 'white', verifyLegalSquare]
    return inCheck(...params);
  } else {
    let kingSquare = findKingSquare('k', position)
    let params = [kingSquare, position, 'black', verifyLegalSquare]
    return inCheck(...params);
  }
}

module.exports = { findKingSquare, isWhite, inCheck, isKingInCheck} 







///




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

