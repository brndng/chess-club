const selectPiece = (origin, piece) => {
  console.log('piece and origin selected:', origin, piece)

  if (origin, piece === null) {
    return {
      type: 'PIECE_SELECTED',
      payload: null,
    };
  } else {
    return {
      type: 'PIECE_SELECTED',
      payload: { origin: {...origin}, piece },
    };
  }
}

export default selectPiece;

// action creator function returns action
// action: type and payload
// state is read-only...must DISPATCH action to change state