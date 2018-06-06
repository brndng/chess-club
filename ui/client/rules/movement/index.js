import movesBasic from './moves-basic.js';
import validatePath from './validate-path.js'; 

export default (pieceToMove, origin, destin, position, moves = []) => {
  let isLegal = false;
  const piece = pieceToMove.toUpperCase();
  if (movesBasic[piece](origin, destin, position)) {
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
            } else { //diagonal
              if (position[destin.row][destin.col] !== null) { //square occupied
                isLegal = true;
              } else { //en passant
                const [prevOrigin, prevDestin, prevPiece] = moves.slice(-1)[0];
                const enemy = pieceToMove === piece ? pieceToMove.toLowerCase() : pieceToMove.toUpperCase();
                if (
                  prevPiece === enemy 
                  && destin.col === prevDestin.col
                  && Math.abs(prevDestin.row - prevOrigin.row) === 2 
                  && Math.abs(prevOrigin.col - origin.col) === 1
                ) {
                  isLegal = true
                }
              }
            }
          }
          if (piece === 'K') {
            let hasMoved = false;
            let rook;
            if (Math.abs(destin.col - origin.col) === 2) { //castling
              if (pieceToMove === 'K') { //white
                destin.col - origin.col > 0 //kingside?
                  ? rook = { row: 7, col: 7 }
                  : rook = { row: 7, col: 0 }
              } else { //black
                destin.col - origin.col > 0 //kingside? //friendly rooks
                  ? rook = { row: 0, col: 7 }
                  : rook = { row: 0, col: 0 }
              }

              for (let i = 0; i < moves.length; i++) { 
                let [pastOrigin, pastDestin, pastPiece] = moves[i];
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
          }
        }
      } 
    }      
  }
  return isLegal;
};


// prevMove
//     && (piece.toUpperCase() === 'P' && prevPiece.toUpperCase() === 'P')
//     && destin.col === prevDestin.col
//     && Math.abs(prevDestin.row - prevOrigin.row) === 2
//     && Math.abs(destin.row - prevDestin.row) === 1
//     && Math.abs(destin.col - origin.col) === 1
//     && Math.abs(destin.row - origin.row) === 1