module.exports = (piece) => {
  return piece === null ? null :
    piece === piece.toUpperCase() ? true : false;
}