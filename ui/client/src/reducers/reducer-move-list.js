export default (state=[], action) => {
  const newState = state.map(move => move.slice());
  switch(action.type) {
    case 'POSITION_CHANGED':
      newState.push(action.payload);
      return newState;
      break;
  }
  return newState;
}