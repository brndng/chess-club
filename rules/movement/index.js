const isBaseMove = require("./is-base-move.js");
const isClearPath = require("./is-clear-path.js");
const isValidException = require("./is-valid-exception");

module.exports = function isLegalMove(
  piece,
  origin,
  destin,
  position,
  moves = []
) {
  return (
    isBaseMove[piece.toUpperCase()](origin, destin, position) &&
    isClearPath(piece, origin, destin, position) &&
    isValidException(piece, origin, destin, position, moves)
  );
};
