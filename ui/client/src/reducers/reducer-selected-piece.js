export default (state=null, action) => {
  switch (action.type) {
    case 'PIECE_SELECTED': 
      return action.payload;
      break;
  }
  return state;
};

// reducers tie STATE and ACTION together
// function that takes in previous state and action as args, and returns the next state of the app
// 'event listener', listens for actions