export default (state=null, action) => {
  switch (action.type) {
    case 'ORIGIN_SELECTED': 
      return action.payload;
      break;
  }
  return state;
};