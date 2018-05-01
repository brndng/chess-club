const castle = (rowStart, rowEnd, colStart, colEnd) => {
  return {
    type: 'CASTLE',
    payload: {rowStart, rowEnd, colStart, colEnd},
  };
}

export default castle;