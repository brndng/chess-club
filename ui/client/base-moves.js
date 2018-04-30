module.exports={
  P: (rowStart, colStart, rowEnd, colEnd) => {
      

      if ((rowStart === 2 || rowStart === 7) && Math.abs(rowEnd-rowStart) === 2) {
        return true;
      }
      if (colEnd-colStart === 0 && Math.abs(rowEnd-rowStart) === 1) {
        return true;
      }
    },
  K: (rowStart, colStart, rowEnd, colEnd) => {
      

      if (Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 0 || 
          Math.abs(rowEnd-rowStart) === 1 && Math.abs(colEnd-colStart) === 0 || 
          Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 1) {
        return true;
      }
    },
  Q: (rowStart, colStart, rowEnd, colEnd) => {
      

      if (colStart === colEnd || rowStart === rowEnd || Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        return true;
      }
    },
  B: (rowStart, colStart, rowEnd, colEnd) => {
      

      if (Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        return true;
      }
    },
  N: (rowStart, colStart, rowEnd, colEnd) => {
      

      if (Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 2 ||
          Math.abs(colEnd-colStart) === 2 && Math.abs(rowEnd-rowStart) === 1) {
        return true;
      }
    },
  R: (rowStart, colStart, rowEnd, colEnd) => {
      

      if (colStart  === colEnd || rowStart === rowEnd) {
        return true;
      }
    },
}