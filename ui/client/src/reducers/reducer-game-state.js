export default (state=null, action) => {
  switch (action.type) {
    case 'GAME_INITIALIZED': 
    console.log('reducer game state firing?', action.payload)

      return action.payload;
      break;
  }
  return state;
};