const baseMoves = require('./movement-base-moves.js');
const validatePath = require('./movement-validate-path.js'); 

module.exports = (pieceToMove, origin, destin, position, moves = []) => {
  // console.log('​module.exports -> pieceToMove, origin, destin, position, moves = []', pieceToMove, origin, destin, position, moves);
  let isLegal = false;
  const piece = pieceToMove.toUpperCase();
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
            } else { //diagonal
              if (position[destin.row][destin.col] !== null) { //square occupied
                isLegal = true;
              } else { //en passant
                const prevMove = moves.slice(-1)[0];
                const [prevOrigin, prevDestin, prevPiece] = prevMove;
                if (
                  prevMove
                  && (piece.toUpperCase() === 'P' && prevPiece.toUpperCase() === 'P')
                  && (prevDestin.row === origin.row && prevDestin.col === destin.col)
                  && Math.abs(prevDestin.row - prevOrigin.row) === 2
                  && Math.abs(destin.col - origin.col) === 1
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


