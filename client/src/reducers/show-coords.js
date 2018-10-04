export default (state = true, action) => {
  switch (action.type) {
    case 'COORDS_TOGGLED': {
      return state ? false : true;
    }
    case 'GAME_INITIALIZED': {
      return true;
    }
  }
  return state;
};
