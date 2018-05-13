import verifyLegalSquare from '../verify-legal-square.js';

const locateKing = (king, matrix) => {
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
  
const isKingInCheck = (userId, white, position) => {
  let inCheck = false;

  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position[i].length; j++) {
      let square = position[i][j];
      if (square !== null) {
        let opponentPiece = '';
        let king = '';
        userId === white
          ? (opponentPiece = square.toLowerCase(), king = 'K')
          : (opponentPiece = square.toUpperCase(), king = 'k');
        if (square === opponentPiece) {
          if(verifyLegalSquare(opponentPiece, [i,j], locateKing(king, position), position)) {
            inCheck = true;
          }
        }
      }
    }
  }
  return inCheck;
}

// const isKingInCheck = (userId, white, position) => { 
//   //TODO: combine inCheck and isKingInCheck, make it nice, make it one time color check, not two ok
//   if(userId === white) { 
//     let kingSquare = locateKing('K', position)
//     return inCheck(kingSquare, position, 'white');
//   } else {
//     let kingSquare = locateKing('k', position)
//     return inCheck(kingSquare, position, 'black');
//   }
// }

module.exports = { locateKing, isWhite, isKingInCheck} 





///move rotateMatrix(matrix ) in here
///dont use matrix




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

