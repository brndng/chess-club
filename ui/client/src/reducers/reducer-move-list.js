export default (state=[], action) => {
  const newState = [...state];
  switch(action.type) {
    case 'POSITION_CHANGED':
      state.push([...action.payload ]);
      return state;
      break;
  }
  return state;
}