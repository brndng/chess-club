export const castleKing = (rowStart, colStart, rowEnd, colEnd, pieceToMove) => {
  return {
    type: 'PLAYER_CASTLING',
    payload: {rowStart, colStart, rowEnd, colEnd, pieceToMove},
  };
}

export const initGame = (id, white, black, position, whiteToMove, moves, inCheck) => {
  return {
    type: 'GAME_INITIALIZED',
    payload: { id, white, black, position, whiteToMove, moves, inCheck },
  };
}

export const loadGames = (games) => {
  return {
    type: 'GAMES_ACCESSED',
    payload: games
  };
}

export const selectPiece = (origin, piece) => {
  console.log('selection:', piece, origin);
  if (origin, piece === null) {
    return {
      type: 'PIECE_SELECTED',
      payload: null,
    };
  } else {
    return {
      type: 'PIECE_SELECTED',
      payload: { origin: {...origin}, piece },
    };
  }
}

export const storeUser = (userId) => {
  return {
    type: 'LOGGED_IN',
    payload: userId
  }
}

export const toggleTurn = () => {
  return {
    type: 'PLAYER_MOVED',
    payload: null
  };
}

export const updateCheckStatus = (userId) => {
  console.log('updateCheckStatus ACTION', userId)
  return {
    type: 'CHECK_STATUS_UPDATED',
    payload: userId
  }
  // if (userId === null) {
  //   console.log('///HERE1')
  //   return {
  //     type: 'CHECK_STATUS_UPDATED',
  //     payload: null,
  //   }
  // } else {
  //   console.log('///HERE2')
  //   return {
  //     type: 'CHECK_STATUS_UPDATED',
  //     payload: userId,
  //   }
  // }
  
}

export const updatePosition = (origin, destination, pieceToMove) => {
  return {
    type: 'POSITION_CHANGED',
    payload:  [ origin, destination, pieceToMove ]  
  };
}



