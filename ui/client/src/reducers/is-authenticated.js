export default (state=false, action) => {
  switch (action.type) {
    case 'AUTH_STATUS_UPDATED': 
      return action.payload;
      break;
  }
  return state;
}