import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import selectPiece from '../actions/action-select-piece.js';
import selectOrigin from '../actions/action-select-origin.js';
// import storeCandidates from '../actions/action-store-candidates.js';
import baseMoves from '../../base-moves.js';
import validatePath from '../../validate-path.js'; ///
import updateMatrix from '../actions/action-update-matrix.js'; ///
import togglePlaced from '../actions/action-toggle-placed.js';
import toggleTurn from '../actions/action-toggle-turn.js';

class Square extends Component {
  constructor(props) {
    super(props);
  }

  initSquareColor() {
    const { row, col } = this.props;
    return (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ?
      'white' : 'black';
  }

  isWhite(piece) {
    if (piece === null) {
      return null;
    }
    return piece === piece.toUpperCase() ? true : false;
  }

  placePiece() {
    const { originSquare, pieceToMove, updateMatrix, togglePlaced, toggleTurn, row, col } = this.props
    const rowStart = originSquare.row;
    const colStart = originSquare.col;
      
    updateMatrix(pieceToMove, rowStart, colStart, row, col);
    togglePlaced();
    toggleTurn();
  }

  handleSquareClick() {
    const { selectPiece, selectOrigin, row, col, piece, whiteToMove, pieceToMove } = this.props;
    const { isWhite } = this;

    if ((isWhite(piece) === whiteToMove)) { 
      selectPiece(piece);
      selectOrigin(row, col);
    }
    if (pieceToMove !== null && (isWhite(piece) !== isWhite(pieceToMove))) {
      this.placePiece();
      // this.getCandidateSquares(pieceToMove);
      selectPiece(null);
      selectOrigin(null, null);
    }
  }

  validateDestination() {
    const { originSquare, pieceToMove, row, col } = this.props;
    const rowStart = originSquare.row;
    const colStart = originSquare.col;
    const piece = pieceToMove.toUpperCase();

    return (baseMoves[piece](rowStart, colStart, row, col));
  }

  // getCandidateSquares(input) {
  //   const { pieceToMove, originSquare, row, col } = this.props;
  //   const rowStart = originSquare.row;
  //   const colStart = originSquare.col;
  //   const squares = [];
  //   const piece = input.toUpperCase();
  //   for (let i=0; i<=7; i++) {
  //     for (let j=0; j<=7; j++) {
  //       if (baseMoves[piece](rowStart, colStart, i, j)) {
  //         squares.push([i,j]);
  //       }
  //     }
  //   }
  //   console.log('squares', squares)
  //   storeCandidates(squares);
  // }

  render() {
    const { piece, candidateSquares } = this.props;
    return (
      <div className="square" id={this.initSquareColor()} onClick={() => this.handleSquareClick()}>
        {piece === null ? null : <Piece piece={piece} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => { // passes data from store, to component as props
  // console.log('my state', state)
  return {
    pieceToMove: state.pieceToMove,
    originSquare: state.originSquare,
    // candidateSquares: state.candidateSquares,
    currentPosition: state.currentPosition,
    whiteToMove: state.whiteToMove,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, selectOrigin, updateMatrix, togglePlaced, toggleTurn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);

