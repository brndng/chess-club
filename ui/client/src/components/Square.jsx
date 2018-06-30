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

  isSelected() {
    const { coords, selection } = this.props;
    if (selection !== null) {
      const { origin } = selection;
      return (coords.row === origin.row && coords.col === origin.col);
    }
  }

  inCheck() {
    const { user, game, inCheck, piece } = this.props;
    return (inCheck === game.white && piece === 'K') || (inCheck === game.black && piece === 'k'); 
  }

  handleSquareClick() {
    const { selection, selectPiece, coords, piece, whiteToMove, isMyTurn, currentPosition, moves } = this.props;

    if (isMyTurn) {
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
    const { user, updatePosition, selection, currentPosition, game, moves, coords, piece, loadPromotingMove } = this.props;
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
    const { user, piece, coords, completed, whiteToMove, isMyTurn, inCheck } = this.props;
    const color = setSquareColor(coords);
    const classes = [
      'square',
      this.isSelected() && 'is-selected',
      this.inCheck() && 'in-check',
    ].filter(cls => !!cls).join(' ');
    const onClick = completed 
      ? null
      : () => this.handleSquareClick();

    return (
      <div id={color} className={classes} onClick={onClick}>
        {piece !== null && 
          <Piece piece={piece} isMyTurn={isMyTurn} whiteToMove={whiteToMove} />}
      </div>
    )
  }
}

const mapStateToProps = ({ user, selection, currentPosition, whiteToMove, isMyTurn, moves, game, inCheck, completed }) => { 
  return { user, selection, currentPosition, whiteToMove, isMyTurn, moves, game, inCheck, completed };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, updatePosition, loadPromotingMove }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);