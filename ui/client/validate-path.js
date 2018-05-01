module.exports = (origin, destination, matrix) => {
  
  let clear = true;

  const path = [];
  let [a,b] = origin;
  let [m,n] = destination;
  let slope = [Math.sign(m-a), Math.sign(n-b)];
  let [x,y] = slope;

  while (!(a === m && b === n )) {
    a += x;
    b += y;
    path.push([a,b]);
  }
  
  path.forEach(square => {
    let [m,n] = square;
    if (matrix[m][n] !== null) {
      clear = false;
    } 
  })
  return clear;
}



