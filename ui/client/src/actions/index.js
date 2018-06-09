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

export const storeUser = (user) => {
  const { id, username } = user;  
  return {
    type: 'LOGGED_IN',
    payload: { id, username },
  };
};

export const storeOpponent = (opponent) => {
  const { id, username } = opponent;  
  return {
    type: 'OPPONENT_FETCHED',
    payload: { id, username },
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

export const declareGameOver = (status, game = null, defeated = null) => {
  if (status === 'checkmate') {
    const result = defeated === game.white
      ? '0 - 1'
      : '1 - 0'
    return {
      type: 'GAME_COMPLETED',
      payload: result,
    };
  } else if (status === 'draw') {
    return {
      type: 'GAME_COMPLETED',
      payload: '1/2 - 1/2',
    };
  }
};

export const updatePosition = (origin, destin, piece, captured, notation, promotedTo, moves = []) => {
  const prevMove = moves.slice(-1)[0];
  const [prevOrigin, prevDestin, prevPiece, ...rest] = prevMove ? prevMove: [];

  if ((piece === 'p' && destin.row === 7) || (piece === 'P' && destin.row === 0)) {
    return {
      type: 'PAWN_PROMOTED',
      payload: [origin, destin, piece, captured, notation, promotedTo],
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
    const captured = piece === piece.toUpperCase()
      ? 'p'
      : 'P';
    return {
      type: 'EN_PASSANT',
      payload: [origin, destin, piece, captured, notation, promotedTo, prevMove]
    };
  } else if (piece.toUpperCase() === 'K' && Math.abs(destin.col - origin.col) === 2) {
    return {
      type: 'KING_CASTLED',
      payload: [origin, destin, piece, captured, notation, promotedTo],
    };
  }

  return {
    type: 'POSITION_CHANGED', 
    payload: [origin, destin, piece, captured, notation, promotedTo],
  };
};

export const updateUserFetched = () => {
  return {
    type: 'CURRENT_USER_FETCHED',
    payload: true,
  };
};

export const authenticate = (status) => {
  return {
    type: 'AUTH_STATUS_UPDATED',
    payload: status,
  };
}

export const loadPromotingMove = (move = []) => {
  return {
    type: 'PROMOTION_STATUS_UPDATED',
    payload: move,
  };
}













