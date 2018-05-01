const selectOrigin = (row, col) => {
  console.log('origin selected:', row, col)
  return {
    type: 'ORIGIN_SELECTED',
    payload: {row, col} //[row,col]
  };
}

export default selectOrigin;