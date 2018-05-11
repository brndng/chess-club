import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { isWhite } from '../../rules/helpers';
import selectPiece from '../actions/action-select-piece.js';
import updateMatrix from '../actions/action-update-matrix.js'; 
import toggleTurn from '../actions/action-toggle-turn.js';
// import castleKing from '../actions/action-castle-king.js';
class Square extends Component {
  constructor(props) {
    super(props);
  }

  initSquareColor() {
    const { row, col } = this.props;
    return (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ?
      'white' : 'black';
  }

  handleSquareClick() {
    const { userId, gameSnapshot, selection, selectPiece, row, col, piece, whiteToMove, currentPosition } = this.props;
    const { white } = gameSnapshot;
    if ((userId === white) === whiteToMove) {
      if ((isWhite(piece) === whiteToMove)) { 
        selectPiece(row, col, piece);
      }
      if (selection !== null && (isWhite(piece) !== isWhite(selection.piece))) {
        const params = [selection.piece, selection.origin, [row, col], currentPosition]
        if (verifyLegalSquare(...params)) {
          this.placeSelectedPiece();
        }
      }
    }
  }

  placeSelectedPiece() {
    const { selectPiece, updateMatrix, selection, row, col } = this.props;
    const [rowStart, colStart] = selection.origin;
    //preview update, king in check?
    updateMatrix(rowStart, colStart, row, col, selection.piece);
    selectPiece(null, null, null);
    console.log('placed piece by user: ', this.props.userId)
  }

  highlight() {
    const { row, col, piece, selection } = this.props;
    if (selection !== null) {
      const [rowStart, colStart] = selection.origin;
      return row === rowStart && col === colStart ?
        'highlight' : null;
    }
    return null;
  }

  render() {
    // console.log('selection  made in time for render?', this.props.selection)

    const { piece, candidateSquares } = this.props;
    return (
      <div id={this.initSquareColor()} className={`square ${this.highlight()}`} onClick={() => this.handleSquareClick()}>
        {piece === null ? null : <Piece piece={piece} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => { // passes data from store, to component as props
  // console.log('my state', state)
  const { selection, currentPosition, whiteToMove, moveList, userId, gameSnapshot } = state;
  return { selection, currentPosition, whiteToMove, moveList, userId, gameSnapshot };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, updateMatrix, toggleTurn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);





    
