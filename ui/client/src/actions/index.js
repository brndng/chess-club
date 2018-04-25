const selectPiece = (piece) => {
  console.log('you clicked on a piece')
  return {
    type: 'PIECE_SELECTED',
    payload: piece,
  };
}

export default selectPiece;

// action creator function returns action
// action: type and payload
// state is read-only...must DISPATCH action to change state