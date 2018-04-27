module.exports = {
  // P: (originSquare, file, rank, pieceToMove, currentPiece) => {
  //     file = file.charCodeAt()-96;
  //     let originFile = originSquare.split('')[0].charCodeAt()-96;
  //     let originRank = Number(originSquare.split('')[1]);

  //     if ((originRank === 2 || originRank === 7) && Math.abs(rank-originRank) === 2) {
  //       return true;
  //     }
  //     if (file === originFile && Math.abs(rank-originRank) === 1) {
  //       return true;
  //     }
  //   },

  P: (piece, file, rank) => {
    file = file.charCodeAt()-96;
    let originFile = originSquare.split('')[0].charCodeAt()-96;
    let originRank = Number(originSquare.split('')[1]);

    if ((originRank === 2 || originRank === 7) && Math.abs(rank-originRank) === 2) {
      return true;
    }
    if (file === originFile && Math.abs(rank-originRank) === 1) {
      return true;
    }
  },

  K: (originSquare, file, rank, pieceToMove, currentPiece) => {
      file = file.charCodeAt()-96;
      let originFile = originSquare.split('')[0].charCodeAt()-96;
      let originRank = Number(originSquare.split('')[1]);

      if (Math.abs(file-originFile) === 1 || 
          Math.abs(rank-originRank) === 1 || 
          Math.abs(file-originFile) === 1 && Math.abs(rank-originRank) === 1) {
        return true;
      }
    },

  Q: (originSquare, file, rank, pieceToMove, currentPiece) => {
      file = file.charCodeAt()-96;
      let originFile = originSquare.split('')[0].charCodeAt()-96;
      let originRank = Number(originSquare.split('')[1]);
      if (file === originFile || rank === originRank || Math.abs(file-originFile) === Math.abs(rank-originRank)) {
        return true;
      }
      
    },

  B: (originSquare, file, rank, pieceToMove, currentPiece) => {
      file = file.charCodeAt()-96;
      let originFile = originSquare.split('')[0].charCodeAt()-96;
      let originRank = Number(originSquare.split('')[1]);

      if (Math.abs(file-originFile) === Math.abs(rank-originRank)) {
        return true;
      }
    },

  N: (originSquare, file, rank, pieceToMove, currentPiece) => {
      file = file.charCodeAt()-96;
      let originFile = originSquare.split('')[0].charCodeAt()-96;
      let originRank = Number(originSquare.split('')[1]);
      if (Math.abs(file-originFile) === 1 && Math.abs(rank-originRank) === 2 ||
          Math.abs(file-originFile) === 2 && Math.abs(rank-originRank) === 1) {
        return true;
      }
    },

  R: (originSquare, file, rank, pieceToMove, currentPiece) => {
      file = file.charCodeAt()-96;
      let originFile = originSquare.split('')[0].charCodeAt()-96;
      let originRank = Number(originSquare.split('')[1]);
      
      // if (currentPiece !== null) {
        
      // } else {

      // }
      if (file === originFile || rank === originRank) {
        return true;
      }
    },

}