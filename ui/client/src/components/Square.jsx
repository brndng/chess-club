import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import { selectPiece, updatePosition, loadPromotingMove } from '../actions/'; 
import verifyLegalSquare from '../../../../rules/movement/';
import { isWhite, convertToChessNotation, setSquareColor } from '../../../../rules/utilities/'
import { 
  isKingInCheck, 
  isGivingCheck,
  willMoveExposeKing,
  willMoveGiveCheck,
  isPawnPromoting, } from '../../../../rules/interactions/';

class Square extends Component {
  constructor(props) {
    super(props);
  }

  initSquareColor() {
    const { coords } = this.props;
    return setSquareColor(coords);
  }

  isSelected() {
    const { coords, selection } = this.props;
    if (selection !== null) {
      const { origin } = selection;
      return (coords.row === origin.row && coords.col === origin.col);
    }
  }

  handleSquareClick() {
    const { user, game, selection, selectPiece, coords, piece, whiteToMove, currentPosition, moves } = this.props;

    if ((user.id === game.white) === whiteToMove) {
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
    const { user, selectPiece, updatePosition, selection, currentPosition, game, whiteToMove, moves, coords, piece, loadPromotingMove } = this.props;
    const _willMoveExposeKing = willMoveExposeKing(user.id, game.white, selection, coords, currentPosition, moves);
    const _check = willMoveGiveCheck(user.id, game.white, selection, coords, currentPosition, moves);
    const _notation = convertToChessNotation(selection.origin, coords, selection.piece, piece, _check);
    const _isPawnPromoting = isPawnPromoting(selection, coords);

    if (!_willMoveExposeKing) {
      if (_isPawnPromoting) {
        loadPromotingMove([selection.origin, coords, selection.piece, piece, _notation]);  
      } else {
        updatePosition(selection.origin, coords, selection.piece, piece, _notation, null, currentPosition, moves);        
      }
    } 
  }

  render() {
    const { piece, completed } = this.props;
    const classes = [
      'square',
      this.isSelected() && 'is-selected' 
    ].filter(cls => !!cls).join(' ');

    const onClick = completed 
      ? null
      : () => this.handleSquareClick();
    return (
      <div id={this.initSquareColor()} className={classes} onClick={onClick}>
        {piece === null ? null : <Piece piece={piece} />}
      </div>
    )
  }
}

const mapStateToProps = ({ user, selection, currentPosition, whiteToMove, moves, game, completed }) => { 
  return { user, selection, currentPosition, whiteToMove, moves, game, completed };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, updatePosition, loadPromotingMove }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);