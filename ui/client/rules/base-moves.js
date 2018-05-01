module.exports = {
  P: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if ((rowStart === 1 || rowStart === 6) && Math.abs(rowEnd-rowStart) === 2) {
        isValid = true;
      }
      if (colEnd-colStart === 0 && Math.abs(rowEnd-rowStart) === 1) {
        isValid = true;
      }
      
      return isValid;
    },
  K: (rowStart, colStart, rowEnd, colEnd) => {
      let isValid = false;
      if (Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 0 || 
          Math.abs(rowEnd-rowStart) === 1 && Math.abs(colEnd-colStart) === 0 || 
          Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 1) {
        isValid = true;
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