module.exports = (origin, destination, matrix) => {
  // define path
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

  // check path clear
  path.forEach(square => {
    let [m,n] = square;
    if (matrix[m][n] !== null) {
      return false;
    } 
  })
  return true;
}



