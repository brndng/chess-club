import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { selectPiece, updatePosition } from '../actions/'; 
import { 
  isWhite, 
  isKingInCheck, 
  willMoveExposeKing,
  isPawnPromoting } from '../../rules/utilities';

class Square extends Component {
  constructor(props) {
    super(props);
  }

  initSquareColor() {
    const { coords } = this.props;
    const { row, col } = coords;
    return ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0))
      ? 'white' 
      : 'black';
  }

  highlightSelected() {
    const { coords, selection } = this.props;

    if (selection !== null) {
      const { origin } = selection;
      return coords.row === origin.row && coords.col === origin.col 
        ? 'highlight' 
        : null;
    }
    return null;
  }

  handleSquareClick() {
    const { userId, game, selection, selectPiece, coords, piece, whiteToMove, currentPosition, moves } = this.props;

    if ((userId === game.white) === whiteToMove) {
      if ((isWhite(piece) === whiteToMove)) { 
        selectPiece(coords, piece);
      }
      if (selection !== null && (isWhite(piece) !== isWhite(selection.piece))) {
        const _isLegalSquare = verifyLegalSquare(selection.piece, selection.origin, coords, currentPosition, moves);
        
        if (_isLegalSquare) {
          this.placeSelectedPiece(); 
        }
      }
    }
  }

  placeSelectedPiece() {
    const { userId, selectPiece, updatePosition, selection, coords, currentPosition, game, moves } = this.props;
    const _willMoveExposeKing = willMoveExposeKing(userId, game.white, selection, coords, currentPosition, moves);

    if (!_willMoveExposeKing) {
      updatePosition(selection.origin, coords, selection.piece, moves);
      selectPiece(null, null);
    } else {
      console.log('thats check SON!');
    }
  }

  render() {
    const onClick = this.props.completed 
      ? null
      : () => this.handleSquareClick();
    return (
      <div id={this.initSquareColor()} className={`square ${this.highlightSelected()}`} onClick={onClick}>
        {this.props.piece === null ? null : <Piece piece={this.props.piece} />}
      </div>
    )
  }
}

const mapStateToProps = ({ selection, currentPosition, whiteToMove, moves, userId, game, completed }) => { 
  return { selection, currentPosition, whiteToMove, moves, userId, game, completed };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, updatePosition }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);









    
