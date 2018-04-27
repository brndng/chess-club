module.exports={
  P: (fromFile, fromRank, toFile, toRank) => {
      fromFile = fromFile.charCodeAt()-96;
      toFile = toFile.charCodeAt()-96;

      if (toFile-fromFile === 0) {
        return true;
      }
    },
  K: (fromFile, fromRank, toFile, toRank) => {
      fromFile = fromFile.charCodeAt()-96;
      toFile = toFile.charCodeAt()-96;

      if (Math.abs(toFile-fromFile) === 1 && Math.abs(toRank-fromRank) === 0 || 
          Math.abs(toRank-fromRank) === 1 && Math.abs(toFile-fromFile) === 0 || 
          Math.abs(toFile-fromFile) === 1 && Math.abs(toRank-fromRank) === 1) {
        return true;
      }
    },
  Q: (fromFile, fromRank, toFile, toRank) => {
      fromFile = fromFile.charCodeAt()-96;
      toFile = toFile.charCodeAt()-96;

      if (fromFile === toFile || fromRank === toRank || Math.abs(toFile-fromFile) === Math.abs(toRank-fromRank)) {
        return true;
      }
    },
  B: (fromFile, fromRank, toFile, toRank) => {
      fromFile = fromFile.charCodeAt()-96;
      toFile = toFile.charCodeAt()-96;

      if (Math.abs(toFile-fromFile) === Math.abs(toRank-fromRank)) {
        return true;
      }
    },
  N: (fromFile, fromRank, toFile, toRank) => {
      fromFile = fromFile.charCodeAt()-96;
      toFile = toFile.charCodeAt()-96;

      if (Math.abs(toFile-fromFile) === 1 && Math.abs(toRank-fromRank) === 2 ||
          Math.abs(toFile-fromFile) === 2 && Math.abs(toRank-fromRank) === 1) {
        return true;
      }
    },
  R: (fromFile, fromRank, toFile, toRank) => {
      fromFile = fromFile.charCodeAt()-96;
      toFile = toFile.charCodeAt()-96;

      if (fromFile  === toFile || fromRank === toRank) {
        return true;
      }
    },
}