module.exports = {
  K: (origin, destin) => {
      let isBaseMove = false;
      if (destin.row === origin.row) {
        if (Math.abs(destin.col-origin.col) === 1 || Math.abs(destin.col-origin.col) === 2) {
          isBaseMove = true;
        }
      }
      if (Math.abs(destin.row-origin.row) === 1) {
        if (destin.col === origin.col || Math.abs(destin.col-origin.col) === 1) {
          isBaseMove = true;
        }
      }
      return isBaseMove;
    },
  Q: (origin, destin) => {
      let isBaseMove = false;
      if (origin.col === destin.col || origin.row === destin.row || Math.abs(destin.col-origin.col) === Math.abs(destin.row-origin.row)) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
  B: (origin, destin) => {
      let isBaseMove = false;
      if (Math.abs(destin.col-origin.col) === Math.abs(destin.row-origin.row)) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
  N: (origin, destin) => {
      let isBaseMove = false;
      if (Math.abs(destin.col-origin.col) === 1 && Math.abs(destin.row-origin.row) === 2 ||
          Math.abs(destin.col-origin.col) === 2 && Math.abs(destin.row-origin.row) === 1) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
  R: (origin, destin) => {
      let isBaseMove = false;
      if (origin.col  === destin.col || origin.row === destin.row) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
  P: (origin, destin) => {
      let isBaseMove = false;

      if (origin.row === 6 && destin.col === origin.col && destin.row-origin.row === -2) {
        isBaseMove = true;
      } else if (origin.row === 1 && destin.col === origin.col && destin.row-origin.row === 2) {
        isBaseMove = true;
      } else {
        if (destin.col === origin.col && Math.abs(destin.row-origin.row) === 1) {
          isBaseMove = true;
        }
        if (Math.abs(destin.col-origin.col) === 1 && Math.abs(destin.row-origin.row) === 1) {
          isBaseMove = true;
        }
      }
      return isBaseMove;
    }, 
}