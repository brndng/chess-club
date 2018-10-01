import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import { selectPiece, updatePosition, loadPromotingMove, loadSquareDetails } from '../actions/';
import verifyLegalSquare from '../../../../rules/movement/';
import { isWhite, convertToChessNotation, setSquareColor, isEqual } from '../../../../rules/utilities/'
import {
  willMoveGiveCheck,
  isPawnPromoting,
  getCandidateSquares,
  isCandidate
} from '../../../../rules/interactions/';

class Square extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user, game, piece, coords, currentPosition, moves, whiteToMove, loadSquareDetails, squares } = this.props;
    const candidateSquares = getCandidateSquares(user.id, game.white, piece, coords, currentPosition, moves, squares);
    loadSquareDetails(coords, piece, candidateSquares, user.id, game.white);
  }

  componentDidUpdate(prevProps) {
    const { user, game, piece, coords, currentPosition, moves, whiteToMove, loadSquareDetails, squares } = this.props;

    if (!isEqual(currentPosition, prevProps.currentPosition)) {
      const candidateSquares = getCandidateSquares(user.id, game.white, piece, coords, currentPosition, moves, squares);
      loadSquareDetails(coords, piece, candidateSquares, user.id, game.white);
    }
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

  isVisualized() {
    const { coords, selection, showVisualizer } = this.props;
    if (selection !== null) {

      return showVisualizer && isCandidate(coords, selection.candidateSquares);
    }
  }

  handleSquareClick() {
    const { selection, selectPiece, coords, piece, whiteToMove, isMyTurn, currentPosition, moves, squares } = this.props;
    const { candidateSquares } = squares[JSON.stringify(coords)];

    if (isMyTurn) {
      if ((isWhite(piece) === whiteToMove)) {
        selectPiece(coords, piece, candidateSquares);
      }

      if (
        selection !== null
        && (isWhite(selection.piece) !== isWhite(piece))
        && isCandidate(coords, selection.candidateSquares)
      ) {
        this.placeSelectedPiece();
      }
    }
  }

  placeSelectedPiece() {
    const { user, updatePosition, selection, currentPosition, game, moves, coords, piece, loadPromotingMove, squares } = this.props;
    const _check = willMoveGiveCheck(user.id, game.white, selection, coords, currentPosition, moves, squares);
    const _notation = convertToChessNotation(selection.origin, coords, selection.piece, piece, _check);
    const _isPawnPromoting = isPawnPromoting(selection, coords);

    if (_isPawnPromoting) {
      loadPromotingMove([selection.origin, coords, selection.piece, piece, _notation]);
    } else {
      updatePosition(selection.origin, coords, selection.piece, piece, _notation, null, currentPosition, moves);
    }
  }

  render() {
    const { user, piece, game, coords, completed, whiteToMove, isMyTurn, inCheck } = this.props;
    const color = setSquareColor(coords);
    const classes = [
      'square',
      this.isSelected() && !completed && 'is-selected',
      this.inCheck() && !completed && 'in-check',
      this.isVisualized() && !completed && 'is-visualized',
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

const mapStateToProps = ({ user, selection, currentPosition, whiteToMove, isMyTurn, moves, game, inCheck, showVisualizer, completed, squares }) => {
  return { user, selection, currentPosition, whiteToMove, isMyTurn, moves, game, inCheck, showVisualizer, completed, squares };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, updatePosition, loadPromotingMove, loadSquareDetails }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);
