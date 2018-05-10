const selectPiece = (rowStart, colStart, piece) => {
  const origin = [rowStart, colStart]
  console.log('piece and origin selected:', origin, piece,)
  if (rowStart, colStart, piece === null) {
    return {
      type: 'PIECE_SELECTED',
      payload: null,
    };
  } else {
    return {
      type: 'PIECE_SELECTED',
      payload: { origin, piece },
    };
  }
}

export default selectPiece;

// action creator function returns action
// action: type and payload
// state is read-only...must DISPATCH action to change state