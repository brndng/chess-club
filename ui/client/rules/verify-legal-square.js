import baseMoves from './base-moves.js';
import validatePath from './validate-path.js'; 

export default (pieceToMove, origin, destin, position, moves=[]) => {
  //TODO: refactor to include allyPiece verification
  //TODO: combine pawn logic
  let isLegal = false;
  let piece = pieceToMove.toUpperCase();
  let enemy = pieceToMove === piece ? pieceToMove.toLowerCase() : pieceToMove.toUpperCase();
  if (baseMoves[piece](origin, destin, position)) {
    if (piece === 'N') {
      isLegal = true;    
    } else {
      if(validatePath(origin, destin, position)) {
        if(piece !== 'P' && piece !== 'K') {
          isLegal = true;          
        } else {
          if (piece === 'P') {
            if (origin.col === destin.col) { //forward
              if (position[destin.row][destin.col] === null) {
                isLegal = true;
              }
            } else {
              if (position[destin.row][destin.col] !== null) { //diagonal
                isLegal = true;
              } else { //en passant
                let [ prevOrigin, prevDestin, prevPiece ] = moves.slice(-1)[0];
                if (
                  prevPiece === enemy 
                  && destin.col === prevDestin.col
                  && Math.abs(prevDestin.row-prevOrigin.row) === 2 
                  && Math.abs(prevOrigin.col-origin.col) === 1
                ) {
                  isLegal = true
                }
              }
            }
          }
          if (piece === 'K') {
            let rook;
let hasMoved = false;
if (Math.abs(destin.col-origin.col) === 2) { //castling
  if (pieceToMove === 'K') { //white
    if (destin.col-origin.col > 0) { //kingside
      rook = { row: 7, col: 7 };
    } else { //queenside
      rook = { row: 7, col: 0 };
    }
  } else { //black
    if (destin.col-origin.col > 0) { //kingside
      rook = { row: 0, col: 7 }
    } else { //queenside
      rook = { row: 0, col: 0 }
    }
  }

  for (let i = 0; i < moves.length; i++) { 
    let [ pastOrigin, pastDestin, pastPiece ] = moves[i];
    if (
      pastPiece === pieceToMove 
      || (pastOrigin.row === rook.row && pastOrigin.col === rook.col)) {
      hasMoved = true;
    }
  }

  if (!hasMoved) {
    isLegal = true;
  }

} else { //not castling
  isLegal = true; 
}
            
          
            // if (Math.abs(destin.col-origin.col) === 2) {
            //   let hasMoved = false; // TODO: add rook move history
            //   for (let i = 0; i < moves.length; i++) {
            //     let [ pastOrigin, pastDestin, pastPiece ] = moves[i];
            //     if (pastPiece === pieceToMove) {
            //       hasMoved = true;
            //     }
            //   }
            //   if (!hasMoved) {
            //     isLegal = true;
            //   }
            // } else {
            //   isLegal = true;  
            // }
          }
        }
      } 
    }      
  }
  return isLegal;
}





