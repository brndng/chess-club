const updateMatrix = (piece) => {
  console.log('updateMatrix');
  return {
    type: 'POSITION_CHANGED',
    payload: ['a','b','c','d'] //can be anything!
  };
}

export default updateMatrix;