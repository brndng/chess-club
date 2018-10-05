module.exports = {
  K: (origin, destin, position) => {
    if (destin.row === origin.row) {
      if (Math.abs(destin.col - origin.col) === 1 || Math.abs(destin.col - origin.col) === 2) {
        return true;
      }
    }
    if (Math.abs(destin.row - origin.row) === 1) {
      if (destin.col === origin.col || Math.abs(destin.col - origin.col) === 1) {
        return true;
      }
    }
    return false;
  },

  Q: (origin, destin, position) => {
    if (
      origin.col === destin.col
      || origin.row === destin.row
      || Math.abs(destin.col - origin.col) === Math.abs(destin.row - origin.row)
    ) {
      return true;
    }
    return false;
  },

  B: (origin, destin, position) => {
    if (Math.abs(destin.col - origin.col) === Math.abs(destin.row - origin.row)) {
      return true;
    }
    return false;
  },

  N: (origin, destin, position) => {
    if (
      (Math.abs(destin.col - origin.col) === 1 && Math.abs(destin.row - origin.row) === 2)
      || (Math.abs(destin.col - origin.col) === 2 && Math.abs(destin.row - origin.row) === 1)
    ) {
      return true;
    }
    return false;
  },

  R: (origin, destin, position) => {
    if (origin.col === destin.col || origin.row === destin.row) {
      return true;
    }
    return false;
  },

  P: (origin, destin, position) => {
    if (position[origin.row][origin.col] === 'P') {
      if (destin.col === origin.col) {
        if (origin.row === 6) {
          if (destin.row - origin.row === -2 || destin.row - origin.row === -1) {
            return true;
          }
        } else {
          if (destin.row - origin.row === -1) {
            return true;
          }
        }
      } else {
        if (destin.row - origin.row === -1 && Math.abs(destin.col - origin.col) === 1) {
          return true;
        }
      }
    }

    if (position[origin.row][origin.col] === 'p') {
      if (destin.col === origin.col) {
        if (origin.row === 1) {
          if (destin.row - origin.row === 2 || destin.row - origin.row === 1) {
            return true;
          }
        } else {
          if (destin.row - origin.row === 1) {
            return true;
          }
        }
      } else {
        if (destin.row - origin.row === 1 && Math.abs(destin.col - origin.col) === 1) {
          return true;
        }
      }
    }
    return false;
  },
};
