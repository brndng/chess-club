import { isEqual } from '../../../../rules/utilities/'

export default (state = [], action) => {
  switch (action.type) {
    case 'GAME_INITIALIZED': {
      const { positionHistory } = action.payload;
      return positionHistory;
    }
    case 'POSITION_CHANGED': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];

      if (!isEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
      }
    }
    case 'PAWN_PROMOTED': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];

      if (!isEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
      }
    }
    case 'EN_PASSANT_APPLIED': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];

      if (!isEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
      }
    }
    case 'KING_CASTLED': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];

      if (!isEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
      }
    }
  }
  return state;
};
