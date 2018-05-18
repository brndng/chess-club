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
  return {
    type: 'CHECK_STATUS_UPDATED',
    payload: userId
  }
}

export const updatePosition = (origin, destin, piece) => {
  if (piece === 'p' && destin.row === 7 || piece === 'P' && destin.row === 0) {
    return {
      type: 'PAWN_PROMOTED',
      payload:  [ origin, destin, piece ]  
    }
  } else if (piece.toUpperCase() === 'K' && Math.abs(destin.col-origin.col) === 2) {
    return {
      type: 'KING_CASTLED',
      payload:  [ origin, destin, piece ]  
    }
  } else {
    return {
      type: 'POSITION_CHANGED',
      payload:  [ origin, destin, piece ]  
    }
  }
}




// const type = piece.toUpperCase() === 'K' && Math.abs(destin.col-origin.col) === 2
//     ? 'KING_CASTLED'
//     : 'POSITION_CHANGED'
//     return {
//       type,
//       payload:  [ origin, destin, piece ]  
//     }





