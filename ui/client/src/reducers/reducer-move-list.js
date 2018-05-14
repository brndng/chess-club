export default (state=[], action) => {
  const newState = [...state];
  switch(action.type) {
    case 'POSITION_CHANGED':
      return [...newState, action.payload];
      
      break;
  }
  return newState;
}


// If you want to be safe with arrays, you need to restrict the operations you perform on the state to the safe accessor methods. Instead of `.push()`, use `.concat()`.