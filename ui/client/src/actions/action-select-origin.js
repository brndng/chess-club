const selectOrigin = (rowStart, colStart) => {
  console.log('origin:', [rowStart, colStart])
  return {
    type: 'ORIGIN_SELECTED',
    payload: [rowStart, colStart]
  };
}

export default selectOrigin;