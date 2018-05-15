const updateCheckStatus = (userId) => {
  console.log('in action:', userId)
  return {
    type: 'CHECK_STATUS_UPDATED',
    payload: userId,
  }
}

export default updateCheckStatus

