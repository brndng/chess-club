export const initGame = (userId, data) => {
  return {
    type: 'GAME_INITIALIZED',
    payload: { userId, ...data },
  };
};

export const loadGames = (games) => {
  return {
    type: 'GAMES_ACCESSED',
    payload: games,
  };
};

export const selectPiece = (origin, piece, candidateSquares) => {
  if (origin === null && piece === null) {
    return {
      type: 'PIECE_SELECTED',
      payload: null,
    };
  }

  return {
    type: 'PIECE_SELECTED',
    payload: { 
      origin: { ...origin }, 
      piece, 
      candidateSquares },
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

export const toggleTurn = (userId, white, prevWhiteToMove) => {
  return {
    type: 'PLAYER_MOVED',
    payload: { userId, white, prevWhiteToMove },
  };
};

export const updateCheckStatus = (userId) => {
  return {
    type: 'CHECK_STATUS_UPDATED',
    payload: userId,
  };
};

export const declareGameOver = (status, game = null, defeated = null) => {
  const result = status === 'draw'
    ? '1/2 - 1/2'
    : defeated === game.white
      ? '0 - 1'
      : '1 - 0'
  
  return {
    type: status.toUpperCase(),
    payload: result,
  };
};

export const updatePosition = (origin, destin, piece, captured, notation, promotedTo, currentPosition, moves = []) => {
  const prevMove = moves.slice(-1)[0];
  const [prevOrigin, prevDestin, prevPiece, ...rest] = prevMove ? prevMove: [];

  if ((piece === 'p' && destin.row === 7) || (piece === 'P' && destin.row === 0)) {
    return {
      type: 'PAWN_PROMOTED',
      payload: [origin, destin, piece, captured, notation, promotedTo, currentPosition],
    };
  } else if (
    prevMove
    && (piece.toUpperCase() === 'P' && prevPiece.toUpperCase() === 'P')
    && (prevDestin.row === origin.row && prevDestin.col === destin.col)
    && Math.abs(prevDestin.row - prevOrigin.row) === 2
    && Math.abs(destin.col - origin.col) === 1
  ) {
    const captured = piece === piece.toUpperCase()
      ? 'p'
      : 'P';
    return {
      type: 'EN_PASSANT',
      payload: [origin, destin, piece, captured, notation, promotedTo, currentPosition, prevMove]
    };
  } else if (piece.toUpperCase() === 'K' && Math.abs(destin.col - origin.col) === 2) {
    return {
      type: 'KING_CASTLED',
      payload: [origin, destin, piece, captured, notation, promotedTo, currentPosition],
    };
  }

  return {
    type: 'POSITION_CHANGED', 
    payload: [origin, destin, piece, captured, notation, promotedTo, currentPosition],
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

export const loadSnapshot = (position) => {
  return {
    type: 'SNAPSHOT_LOADED',
    payload: position,
  };
}

export const loadTurn = (userId, white, index) => {
  return {
    type: 'SNAPSHOT_CHANGED',
    payload: { userId, white, index },
  };
}

export const toggleCoords = () => {
  return {
    type: 'COORDS_TOGGLED',
    payload: null,
  };
};

export const toggleVisualizer = () => {
  return {
    type: 'VISUALIZER_TOGGLED',
    payload: null,
  };
}
















