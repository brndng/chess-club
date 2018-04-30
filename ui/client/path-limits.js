module.exports = {
  P: () => {},

  K: () => {},

  Q: () => {},

  B: () => {},

  N: () => {},

  R: (fromFile, fromRank, toFile, toRank, maxDist) => {
    
      fromFile = fromFile.charCodeAt()-96;
      toFile = toFile.charCodeAt()-96;

      if (fromFile  === toFile ) {
        let rankDirection = toRank-fromRank;
      }
      if (fromRank === toRank) {
        let fileDirection = toFile-fromFile;
      }
      const dist = Math.sqrt(Math.pow(toRank-fromRank, 2) - Math.pow(toFile-fromFile, 2));
      // compare max dist with dist of all blocker?
    },

}