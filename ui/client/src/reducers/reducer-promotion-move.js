export default (state = [], action) => {
  switch(action.type) {
    case 'PROMOTION_STATUS_UPDATED': {
      return action.payload;
      break;
    }
  }
  return state;
};
