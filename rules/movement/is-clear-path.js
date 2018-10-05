module.exports = function isClearPath(piece, origin, destin, position) {

  if (piece.toUpperCase() === 'N') return true;

  let isClear = true;
  let y = origin.row;
  let x = origin.col;
  const dy = Math.sign(destin.row - origin.row);
  const dx = Math.sign(destin.col - origin.col);
  const path = [];

  while (!(y === destin.row && x === destin.col)) {
    y += dy;
    x += dx;
    path.push({ y, x });
  }

  if (path.length === 1) return isClear;

  path.forEach((square) => {
    const { y, x } = square;
    if (
      position[y][x] !== null
      && !(y === destin.row && x === destin.col)
    ) {
      isClear = false;
    }
  });

  return isClear;
};
