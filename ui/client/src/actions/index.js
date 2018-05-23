export const initGame = (data) => {
  const { id, white, black, position, whiteToMove, moves, inCheck, completed } = data;
  return {
    type: 'GAME_INITIALIZED',
    payload: { id, white, black, position, whiteToMove, moves, inCheck, completed },
  };
};

export const loadGames = (games) => {
  return {
    type: 'GAMES_ACCESSED',
    payload: games,
  };
};

export const selectPiece = (origin, piece) => {
  if (origin === null && piece === null) {
    return {
      type: 'PIECE_SELECTED',
      payload: null,
    };
  }

  return {
    type: 'PIECE_SELECTED',
    payload: { origin: { ...origin }, piece },
  };
};

export const storeUser = (userId) => {
  return {
    type: 'LOGGED_IN',
    payload: userId,
  };
};

export const toggleTurn = () => {
  return {
    type: 'PLAYER_MOVED',
    payload: null,
  };
};

export const updateCheckStatus = (userId) => {
  return {
    type: 'CHECK_STATUS_UPDATED',
    payload: userId,
  };
};

export const updateGameOver = () => {
  return {
    type: 'GAME_COMPLETED',
    payload: null,
  };
};

export const updatePosition = (origin, destin, piece, moves = []) => {
  const prevMove = moves.slice(-1)[0];
  const [prevOrigin, prevDestin, prevPiece] = prevMove ? prevMove: [];
  
  if ((piece === 'p' && destin.row === 7) || (piece === 'P' && destin.row === 0)) {
    return {
      type: 'PAWN_PROMOTED',
      payload: [origin, destin, piece],
    };
  } else if (
    prevMove
    && (piece.toUpperCase() === 'P' && prevPiece.toUpperCase() === 'P')
    && destin.col === prevDestin.col
    && Math.abs(prevDestin.row - prevOrigin.row) === 2
    && Math.abs(destin.row - prevDestin.row) === 1
    && Math.abs(destin.col - origin.col) === 1
    && Math.abs(destin.row - origin.row) === 1
  ) {
    return {
      type: 'EN_PASSANT',
      payload: [origin, destin, piece, prevMove],
    };
  } else if (piece.toUpperCase() === 'K' && Math.abs(destin.col - origin.col) === 2) {
    return {
      type: 'KING_CASTLED',
      payload: [origin, destin, piece],
    };
  }

  return {
    type: 'POSITION_CHANGED', 
    payload: [origin, destin, piece],
  };
};






