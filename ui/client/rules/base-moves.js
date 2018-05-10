module.exports = {
  P: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if (colEnd === colStart) {
        if (Math.abs(rowEnd-rowStart) === 1 || Math.abs(rowEnd-rowStart) === 2) {
          isValid = true;
        }
      }
      if (Math.abs(colEnd-colStart) === 1) {
        if (rowEnd === rowStart || Math.abs(rowEnd-rowStart) === 1) {
          isValid = true;
        }
      }
      return isValid;
    },
  K: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if (rowEnd === rowStart) {
        if (Math.abs(colEnd-colStart) === 1 || Math.abs(colEnd-colStart) === 2) {
          isValid = true;
        }
      }
      if (Math.abs(rowEnd-rowStart) === 1) {
        if (colEnd === colStart || Math.abs(colEnd-colStart) === 1) {
          isValid = true;
        }
      }
      return isValid;
    },
  Q: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if (colStart === colEnd || rowStart === rowEnd || Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        isValid = true;
      }
      return isValid;
    },
  B: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if (Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        isValid = true;
      }
      return isValid;
    },
  N: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if (Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 2 ||
          Math.abs(colEnd-colStart) === 2 && Math.abs(rowEnd-rowStart) === 1) {
        isValid = true;
      }
      return isValid;
    },
  R: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if (colStart  === colEnd || rowStart === rowEnd) {
        isValid = true;
      }
      return isValid;
    },
}