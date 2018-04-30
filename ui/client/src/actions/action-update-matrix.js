const updateMatrix = (piece, rowStart, colStart, rowEnd, colEnd) => {
  return {
    type: 'POSITION_CHANGED',
    payload: { piece, rowStart, colStart, rowEnd, colEnd } 
  };
}

export default updateMatrix;