export default (state = true, action) => {
  switch(action.type) {
    case 'COORDS_TOGGLED': {
      return state ? false : true;
      break;
    }
    case 'GAME_INITIALIZED': {
      return true;
      break;
    }
  }
  return state;
};