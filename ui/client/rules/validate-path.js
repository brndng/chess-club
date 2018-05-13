module.exports = (origin, destination, matrix) => {
  let clear = true;

  const path = [];
  let [a,b] = origin; // { x: 2, y: 3 } --> origin.x, origin.y
  let [m,n] = destination; //x2,y2
  let [x,y] = [Math.sign(m-a), Math.sign(n-b)]; //slope //dx,dy
  
  while (!(a === m && b === n )) {
    a += x;
    b += y;
    path.push([a,b]);
  }

  if (path.length === 1) { 
    return clear;
  }
   
  path.forEach(square => {
    let [i,j] = square;
    if (matrix[i][j] !== null && !(i === m && j === n)) {
      clear = false;
    } 
  });
  return clear;
}



