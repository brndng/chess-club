export default (state=true, action) => {
  console.log('whiteToMove:', state)
  switch(action.type) {
    case 'PLAYER_MOVED':
      return state ? false : true;
      break;
  }
  return state;
}