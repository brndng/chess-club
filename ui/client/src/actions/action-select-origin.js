const selectOrigin = (square) => {
  console.log('origin selected:', square)
  return {
    type: 'ORIGIN_SELECTED',
    payload: square,
  };
}

export default selectOrigin;