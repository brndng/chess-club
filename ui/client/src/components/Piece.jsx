import React from 'react';

const Piece = (props) => {
  //this.props.hasMoved...how do I 'see' this from parent component
  return <button>{props.piece}</button>
}

export default Piece;