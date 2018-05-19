import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { isWhite, isKingInCheck, willMoveExposeKing } from '../../rules/utilities';
import { selectPiece, updatePosition } from '../actions/'; 
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
    if (selection !== null ) {
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
        selectPiece({...coords}, piece);
      }
      if (selection !== null && (isWhite(piece) !== isWhite(selection.piece))) {
        if (verifyLegalSquare(selection.piece, selection.origin, coords, currentPosition, moves)) {
          this.placeSelectedPiece(); 
        }
      }
    }
  }

  placeSelectedPiece() {
    const { userId, selectPiece, updatePosition, selection, coords, currentPosition, game, moves } = this.props;

    if (!willMoveExposeKing(userId, game.white, selection, coords, currentPosition, moves)) {
      if (
        (selection.piece === 'P' && coords.row === 0)
        || (selection.piece === 'p' && coords.row === 7)
      ) {
        console.log('your pawn is gonna get PROMOTED SON')
      }
      updatePosition(selection.origin, coords, selection.piece, moves);
      selectPiece(null, null);
    } else {
      console.log('thats check SON!');
    }
  }

  render() {
    return (
      <div id={this.initSquareColor()} className={`square ${this.highlightSelected()}`} onClick={() => this.handleSquareClick()}>
        {this.props.piece === null ? null : <Piece piece={this.props.piece} />}
      </div>
    )
  }
}

const mapStateToProps = ({ selection, currentPosition, whiteToMove, moves, userId, game }) => { 
  return { selection, currentPosition, whiteToMove, moves, userId, game };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, updatePosition }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);









    
