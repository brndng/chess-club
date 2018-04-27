export default (state=null, action) => {
  switch (action.type) {
    case 'CANDIDATES_DETERMINED': 
      return action.payload;
      break;
  }
  return state;
};