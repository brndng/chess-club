export default (state = null, action) => {
  switch (action.type) {
    case 'LOGGED_IN': 
    console.log('​action.payload', action.payload);

      return action.payload;
      break;
  }
  return state;
};
