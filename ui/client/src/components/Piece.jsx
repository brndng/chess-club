import React from 'react';

const Piece = (props) => {
  //this.props.hasMoved...how do I 'see' this from parent component
  return <button>{props.currentPiece}</button>
}

export default Piece;