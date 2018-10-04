const baseMoves = require('./is-base-move.js');
const validatePath = require('./is-valid-path.js');

module.exports = (pieceToMove, origin, destin, position, moves = []) => {
  let isLegal = false;
  const piece = pieceToMove.toUpperCase();
  if (baseMoves[piece](origin, destin, position)) {
    if (piece === 'N') {
      isLegal = true;
    } else {
      if (validatePath(origin, destin, position)) {
        if (piece !== 'P' && piece !== 'K') {
          isLegal = true;
        } else {
          if (piece === 'P') {
            if (origin.col === destin.col) {
              if (position[destin.row][destin.col] === null) {
                isLegal = true;
              }
            } else {
              if (position[destin.row][destin.col] !== null) {
                isLegal = true;
              } else {
                const prevMove = moves.slice(-1)[0];
                if (prevMove) {
                  const [prevOrigin, prevDestin, prevPiece] = prevMove;
                  if (
                    (piece.toUpperCase() === 'P' && prevPiece.toUpperCase() === 'P')
                    && (prevDestin.row === origin.row && prevDestin.col === destin.col)
                    && Math.abs(prevDestin.row - prevOrigin.row) === 2
                    && Math.abs(destin.col - origin.col) === 1
                  ) {
                    isLegal = true
                  }
                }
              }
            }
          }
          if (piece === 'K') {
            let hasMoved = false;
            let rook;
            if (Math.abs(destin.col - origin.col) === 2) {
              if (pieceToMove === 'K') {
                destin.col - origin.col > 0
                  ? rook = { row: 7, col: 7 }
                  : rook = { row: 7, col: 0 }
              } else {
                destin.col - origin.col > 0
                  ? rook = { row: 0, col: 7 }
                  : rook = { row: 0, col: 0 }
              }
              for (let i = 0; i < moves.length - 1; i++) {
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
            } else {
              isLegal = true;
            }
          }
        }
      }
    }
  }
  return isLegal;
};


