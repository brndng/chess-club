export default (state={}, action) => {
  switch(action.type) {
    case 'CHECK_STATUS_UPDATED':
      state.userId = action.payload //TODO: test further
      return state;
      break;
  }
  return state;
}