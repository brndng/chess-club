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
      return [...state, prevPosition];
      break;
    }
  }
  return state;
};