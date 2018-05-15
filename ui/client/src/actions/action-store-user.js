const storeUser = (userId) => {
  return {
    type: 'LOGGED_IN',
    payload: userId
  }
}

export default storeUser;