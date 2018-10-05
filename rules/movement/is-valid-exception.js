const {
  isPawn,
  isEqual,
  isCastling,
  getCastleSideRook,
  isDiagonalPawnMove,
  isSquareOccupied,
  isEnPassant,
  isAlly,
} = require("../utilities/index");

module.exports = function isValidException(piece, origin, destin, position, moves) {
  switch (piece) {
    case 'p': {
      const _isDiagonalPawnMove = isDiagonalPawnMove(piece, origin, destin);
      const _isSquareOccupied = isSquareOccupied(position, destin.row, destin.col)
      const _isAlly = isAlly(piece, position[destin.row][destin.col])
      const _isEnPassant = isEnPassant(piece, origin, destin, position, moves)

      if (_isDiagonalPawnMove) {
        if (_isSquareOccupied && !_isAlly) {
          return true;
        } else {
          if (_isEnPassant) {
            return true;
          }
        }
      }
      return true;
    }
    case 'k': {
      if (isCastling(piece, origin, destin)) {
        let rook = getCastleSideRook(piece, origin, destin);
        for (let i = 0; i < moves.length - 1; i++) {
          let [pastOrigin, pastDestin, pastPiece] = moves[i];
          if (
            isEqual(pastPiece, piece)
            || (isEqual(rook.row, pastOrigin.row) && isEqual(rook.col, pastOrigin.col))
          ) {
            return false;
          }
        }
        return true;
      }
      return true;
    }
    default:
      return true;
  }
}
