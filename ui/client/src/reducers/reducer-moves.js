export default (state=[], action) => {
  const newState = state.map(row => [...row]);
  switch(action.type) {
    case 'POSITION_CHANGED': {
      return [...newState, action.payload];
      break;
    }
    case 'GAME_INITIALIZED': {
      let { moves } = action.payload;
      return [...moves]; 
      break;
      }
  }
  return newState;
}


// If you want to be safe with arrays, you need to restrict the operations you perform on the state to the safe accessor methods. Instead of `.push()`, use `.concat()`.