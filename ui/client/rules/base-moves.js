module.exports = {
  P: (rowStart, colStart, rowEnd, colEnd) => {
      let valid = false;
      if (colEnd === colStart) {
        if (Math.abs(rowEnd-rowStart) === 1 || Math.abs(rowEnd-rowStart) === 2) {
          valid = true;
        }
      }
      if (Math.abs(colEnd-colStart) === 1) {
        if (rowEnd === rowStart || Math.abs(rowEnd-rowStart) === 1) {
          valid = true;
        }
      }
      return valid;
    },
  K: (rowStart, colStart, rowEnd, colEnd) => {
      let valid = false;
      if (rowEnd === rowStart) {
        if (Math.abs(colEnd-colStart) === 1 || Math.abs(colEnd-colStart) === 2) {
          valid = true;
        }
      }
      if (Math.abs(rowEnd-rowStart) === 1) {
        if (colEnd === colStart || Math.abs(colEnd-colStart) === 1) {
          valid = true;
        }
      }
      return valid;
    },
  Q: (rowStart, colStart, rowEnd, colEnd) => {
      let valid = false;
      if (colStart === colEnd || rowStart === rowEnd || Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        valid = true;
      }
      return valid;
    },
  B: (rowStart, colStart, rowEnd, colEnd) => {
      let valid = false;
      if (Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        valid = true;
      }
      return valid;
    },
  N: (rowStart, colStart, rowEnd, colEnd) => {
      let valid = false;
      if (Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 2 ||
          Math.abs(colEnd-colStart) === 2 && Math.abs(rowEnd-rowStart) === 1) {
        valid = true;
      }
      return valid;
    },
  R: (rowStart, colStart, rowEnd, colEnd) => {
      let valid = false;
      if (colStart  === colEnd || rowStart === rowEnd) {
        valid = true;
      }
      return valid;
    },
}