export default (state=null, action) => {
  switch (action.type) {
    case 'LOGGED_IN': 
      return action.payload;
      break;
  }
  return state;
};