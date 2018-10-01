import React from 'react';
import { chessmen } from '../../../../rules/utilities';

const Piece = (props) => {
  const { isMyTurn, whiteToMove, piece } = props;
  const { symbol, color } = chessmen[piece];
  const classes = [
    color,
    (isMyTurn && whiteToMove === (piece === piece.toUpperCase())) && 'is-my-turn',
  ].filter(cls => !!cls).join(' ');

  return <div className={classes}>{symbol}</div>
}

export default Piece;
