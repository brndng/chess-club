import { areEqual } from '../../../../rules/utilities/'

export default (state = [], action) => {
  // const newState = state.map(board => board.map(row => [...row]));
  switch(action.type) {
    case 'GAME_INITIALIZED': {
      const { positionHistory } = action.payload;
      return positionHistory;
      break;
    }
    case 'POSITION_CHANGED': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];
      
      if (!areEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
        break;
      }
    }
    case 'PAWN_PROMOTED': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];
      
      if (!areEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
        break;
      }
    }
    case 'EN_PASSANT': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];
      
      if (!areEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
        break;
      }
    }
    case 'KING_CASTLED': {
      const move = action.payload;
      const prevPosition = move[6];
      const lastPosition = state.slice(-1)[0];
      
      if (!areEqual(prevPosition, lastPosition)) {
        return [...state, prevPosition];
        break;
      }
    }
  }
  return state;
};