module.exports = {
  P: (rowStart, colStart, rowEnd, colEnd) => {
      let isBaseMove = false;
      if (colEnd === colStart) {
        if (Math.abs(rowEnd-rowStart) === 1 || Math.abs(rowEnd-rowStart) === 2) {
          isBaseMove = true;
        }
      }
      if (Math.abs(colEnd-colStart) === 1) {
        if (rowEnd === rowStart || Math.abs(rowEnd-rowStart) === 1) {
          isBaseMove = true;
        }
      }
      return isBaseMove;
    },
  K: (rowStart, colStart, rowEnd, colEnd) => {
      let isBaseMove = false;
      if (rowEnd === rowStart) {
        if (Math.abs(colEnd-colStart) === 1 || Math.abs(colEnd-colStart) === 2) {
          isBaseMove = true;
        }
      }
      if (Math.abs(rowEnd-rowStart) === 1) {
        if (colEnd === colStart || Math.abs(colEnd-colStart) === 1) {
          isBaseMove = true;
        }
      }
      return isBaseMove;
    },
  Q: (rowStart, colStart, rowEnd, colEnd) => {
      let isBaseMove = false;
      if (colStart === colEnd || rowStart === rowEnd || Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
  B: (rowStart, colStart, rowEnd, colEnd) => {
      let isBaseMove = false;
      if (Math.abs(colEnd-colStart) === Math.abs(rowEnd-rowStart)) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
  N: (rowStart, colStart, rowEnd, colEnd) => {
      let isBaseMove = false;
      if (Math.abs(colEnd-colStart) === 1 && Math.abs(rowEnd-rowStart) === 2 ||
          Math.abs(colEnd-colStart) === 2 && Math.abs(rowEnd-rowStart) === 1) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
  R: (rowStart, colStart, rowEnd, colEnd) => {
      let isBaseMove = false;
      if (colStart  === colEnd || rowStart === rowEnd) {
        isBaseMove = true;
      }
      return isBaseMove;
    },
}