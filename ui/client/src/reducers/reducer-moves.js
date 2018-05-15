export default (state=[], action) => {
  const newState = state.map(row => [...row]);
  switch(action.type) {
    case 'POSITION_CHANGED': {
      return [...newState, action.payload];
      break;
    }
    case 'GAME_INITIALIZED': {
      let { moves } = action.payload;
      console.log('GAME_INITIALIZED', moves)
      return [...moves]; //test this vs position vs postion.map(row => row.slice())
      break;
      }
  }
  return newState;
}


// If you want to be safe with arrays, you need to restrict the operations you perform on the state to the safe accessor methods. Instead of `.push()`, use `.concat()`.