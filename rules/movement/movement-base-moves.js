module.exports = {
  K: (origin, destin, position) => {
    let isBaseMove = false;

    if (destin.row === origin.row) {
      if (Math.abs(destin.col - origin.col) === 1 || Math.abs(destin.col - origin.col) === 2) {
        isBaseMove = true;
      }
    }

    if (Math.abs(destin.row - origin.row) === 1) {
      if (destin.col === origin.col || Math.abs(destin.col - origin.col) === 1) {
        isBaseMove = true;
      }
    }

    return isBaseMove;
  },
  Q: (origin, destin, position) => {
    let isBaseMove = false;

    if (
      origin.col === destin.col
      || origin.row === destin.row
      || Math.abs(destin.col - origin.col) === Math.abs(destin.row - origin.row)
    ) {
      isBaseMove = true;
    }

    return isBaseMove;
  },
  B: (origin, destin, position) => {
    let isBaseMove = false;

    if (Math.abs(destin.col - origin.col) === Math.abs(destin.row - origin.row)) {
      isBaseMove = true;
    }

    return isBaseMove;
  },
  N: (origin, destin, position) => {
    let isBaseMove = false;

    if (
      (Math.abs(destin.col - origin.col) === 1 && Math.abs(destin.row - origin.row) === 2)
      || (Math.abs(destin.col - origin.col) === 2 && Math.abs(destin.row - origin.row) === 1)
    ) {
      isBaseMove = true;
    }

    return isBaseMove;
  },
  R: (origin, destin, position) => {
    let isBaseMove = false;
   
    
    if (origin.col === destin.col || origin.row === destin.row) {
      isBaseMove = true;
    }

    return isBaseMove;
  },
  P: (origin, destin, position) => {
    let isBaseMove = false;

    if (position[origin.row][origin.col] === 'P') { //white
      if (destin.col === origin.col) { //forward
        if (origin.row === 6) { //og square
          if (destin.row - origin.row === -2 || destin.row - origin.row === -1) {
            isBaseMove = true;
          }
        } else { //not og
          if (destin.row - origin.row === -1) {
            isBaseMove = true;
          }
        }
      } else {  //diagonal
        if (destin.row - origin.row === -1 && Math.abs(destin.col - origin.col) === 1) {
          isBaseMove = true;
        }
      }
    }

    if (position[origin.row][origin.col] === 'p') { //black
      if (destin.col === origin.col) { //forward
        if (origin.row === 1) { //og square
          if (destin.row - origin.row === 2 || destin.row - origin.row === 1) {
            isBaseMove = true;
          }
        } else { //not og 
          if (destin.row - origin.row === 1) {
            isBaseMove = true;
          }
        }
      } else { //diagonal
        if (destin.row - origin.row === 1 && Math.abs(destin.col - origin.col) === 1) {
          isBaseMove = true;
        }
      }
    }
    return isBaseMove;
  },
};
