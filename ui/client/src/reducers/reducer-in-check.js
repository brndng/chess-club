export default (state=0, action) => {
  console.log('nCheck reducer: action.paylod', action.payload)
  switch(action.type) {
    case 'CHECK_STATUS_UPDATED': {
      return action.payload;
      break;
    }
    case 'GAME_INITIALIZED': {
      const { inCheck } = action.payload;
      return inCheck;
      break;
    }
  }
  return state;
}