module.exports = (origin, destination, matrix) => {
  if (origin['row'] === null) {
    return false;
  }
  let isValid = true;
  // define path
  const path = [];
  //reassign origin
  origin = [origin['row'],origin['col']]
  let [a,b] = origin;
  let [m,n] = destination;
  let slope = [Math.sign(m-a), Math.sign(n-b)];
  let [x,y] = slope;

  console.log('//-/-/-/-/-/-/-a,b,m,n,x,y',a,b,m,n,x,y)

  while (!(a === m && b === n )) {
    a += x;
    b += y;
    path.push([a,b]);
  }
  
  // check path clear
  path.forEach(square => {
    let [m,n] = square;
    
    if (matrix[m][n] !== null) {
      console.log('---matrix[m][n]',matrix[m][n])
      console.log('----T/F', matrix[m][n] !== null)
      isValid = false;;
    } 
  })
  return isValid;
}



