export default (origin, destin, position) => {

  let isClear = true;
  let path = [];
  let y = origin.row;
  let x = origin.col;
  let dy = Math.sign(destin.row-origin.row);
  let dx = Math.sign(destin.col-origin.col);  

  while (!(y === destin.row && x === destin.col)) {
    y += dy;
    x += dx;
    path.push([y, x]);
  }

  if (path.length === 1) { 
    return isClear;
  }
   
  path.forEach(square => {
    let [i,j] = square;
    if (position[i][j] !== null && !(i === destin.row && j === destin.col)) {
      isClear = false;
    } 
  });

  return isClear;
}



