export default (state = false, action) => {
  switch (action.type) {
    case 'CURRENT_USER_FETCHED':
      return action.payload;
  }
  return state;
}