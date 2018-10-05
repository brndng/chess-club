const {
  isCastling,
  isLegalCastle,
  isDiagonalPawnMove,
  isSquareOccupied,
  isEnPassant,
  isAlly,
} = require("../utilities/index");

module.exports = function isValidException(piece, origin, destin, position, moves) {

  switch (piece.toUpperCase()) {
    case 'P': {
      const _isDiagonalPawnMove = isDiagonalPawnMove(piece, origin, destin);
      const _isSquareOccupied = isSquareOccupied(position, destin.row, destin.col);
      const _isAlly = isAlly(piece, position[destin.row][destin.col]);
      const _isEnPassant = isEnPassant(piece, origin, destin, position, moves);

      if (_isDiagonalPawnMove) {
        return (_isSquareOccupied && !_isAlly) || _isEnPassant;
      }
      return true;
    }
    case 'K': {
      const _isCastling = isCastling(piece, origin, destin);
      const _isLegalCastle = isLegalCastle(piece, origin, destin, moves);

      if (_isCastling) {
        return _isLegalCastle;
      }
      return true;
    }
    default:
      return true;
  }
}
