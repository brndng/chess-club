import isWhite from './is-white.js';
import verifyLegalSquare from './verify-legal-square.js'; 

//(selectedPiece, origin, destination, matrix)

// if(userId === whiteId) { --> player is white
//   console.log('inCheck:', inCheck(kingSquare, currPosition, 'white'))
// } else {
//   console.log('inCheck:', inCheck(kingSquare, currPosition, 'black'))

// }


//CHECK

//component updates with new position
//iterate through position for enemy pieces
  //if (selection !== null && (isWhite(piece) !== isWhite(selection.piece))) 
//cb('piece', piecesorigin, mykingssquare, currPosition)

module.exports = (kingSquare, matrix, color) => {
  let inCheck = false;

  if (color === 'white') {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== null && matrix[i][j] === matrix[i][j].toLowerCase()) {
          let oppPiece = matrix[i][j];
          if(verifyLegalSquare(oppPiece, [i,j], kingSquare, matrix)) {
            console.log('incheck true, oppPiece, [i,j]',oppPiece, [i,j])
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
          if(verifyLegalSquare(oppPiece, [i,j], kingSquare, matrix)) {
            console.log('incheck true, oppPiece, [i,j]',oppPiece, [i,j])
            inCheck = true;
          }
        }
      }
    }
  }
  return inCheck;
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







