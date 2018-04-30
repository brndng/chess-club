export default (state=null, action) => {
  switch (action.type) {
    case 'POSITION_CHANGED': 
      console.log('\tPOSITION_CHANGED -- sub-state:', state);
      if (state === null) {
        return [1,2,3,4];
      } else {
        // state[1] = 8;
        // return state;
        return state.map(elem => elem === 2 ? 8: elem );
        //return [...state, state[1] = 8]
      }
      //return {...state, currentPosition: [...state.currentPosition, 'anything']}
    // return {...state, currentPosition: state.currentPosition.map(elem => elem === 'target' ? 'anything': elem)}
    break;
  }
  return state;
};


   