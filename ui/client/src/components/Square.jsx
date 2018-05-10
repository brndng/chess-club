import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import selectPiece from '../actions/action-select-piece.js';
import baseMoves from '../../rules/base-moves.js';
import validatePath from '../../rules/validate-path.js'; 
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

  isWhite(piece) {
    if (piece === null) {
      return null;
    }
    return piece === piece.toUpperCase() ? true : false;
  }

  applyMoveLogic() {
    const { selection, row, col, currentPosition } = this.props;
    if (this.validateDestination()) {
      if (selection.piece === 'n' || selection.piece === 'N') {
        this.placePiece();
      } else {
        if (validatePath(selection.origin, [row,col], currentPosition)) {
          this.placePiece();
        } 
      }
    }
  }

  handleSquareClick() {
    const { userId, gameSnapshot, selection, toggleTurn, selectPiece, row, col, piece, whiteToMove, currentPosition } = this.props;
    const { white } = gameSnapshot;
    if ((userId === white) === whiteToMove) {
      if ((this.isWhite(piece) === whiteToMove)) { 
        selectPiece(row, col, piece);
      }
      if (selection !== null && (this.isWhite(piece) !== this.isWhite(selection.piece))) {
        this.applyMoveLogic()
      }
    }
  }

  placePiece() {
    const { selectPiece, updateMatrix, selection, row, col } = this.props;
    const [rowStart, colStart] = selection.origin;
    updateMatrix(rowStart, colStart, row, col, selection.piece);
    selectPiece(null, null, null);

    console.log('placed piece by user: ', this.props.userId)
  }

  validateDestination() {
    const { selection, row, col, piece } = this.props;
    const [rowStart, colStart] = selection.origin;
    const pieceToMove = selection.piece.toUpperCase();

    
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

// /TESTING
      // if ((pieceToMove === 'K' || pieceToMove === 'k')) {
      //   const [rowStart, colStart] = originSquare;
  
      //     castleKing(rowStart, colStart, row, col, pieceToMove);
      //     selectPiece(null);
      //     selectOrigin(null, null);
      //     toggleTurn();
        
      // } 

      ///TESTING
    // if (pieceToMove === 'P') {
    //   return (baseMoves['P'](rowStart, colStart, row, col, piece, selection.piece));
    // } else {
    //   return (baseMoves[pieceToMove](rowStart, colStart, row, col));
    // }

