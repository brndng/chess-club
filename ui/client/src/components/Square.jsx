import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import selectPiece from '../actions/action-select-piece.js';
import selectOrigin from '../actions/action-select-origin.js';
import baseMoves from '../../rules/base-moves.js';
import validatePath from '../../rules/validate-path.js'; 
import updateMatrix from '../actions/action-update-matrix.js'; 
import toggleTurn from '../actions/action-toggle-turn.js';

import castleKing from '../actions/action-castle-king.js';

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
    const { castleKing, selectOrigin, selectPiece, updateMatrix, toggleTurn, originSquare, pieceToMove, row, col } = this.props;
    const [rowStart, colStart] = originSquare;
    updateMatrix(rowStart, colStart, row, col, pieceToMove);
    selectPiece(null);
    selectOrigin(null, null);

    // toggleTurn(); //no longer needed here? updates in game cdu
    console.log('placed piece by user: ', this.props.userId)
  }

  handleSquareClick() {
    const { userId, gameState, toggleTurn, castleKing, selectPiece, selectOrigin, originSquare, row, col, piece, whiteToMove, pieceToMove, currentPosition } = this.props;
    const { white } = gameState;
    if ((userId === white) === whiteToMove) {
      if ((this.isWhite(piece) === whiteToMove)) { 
        selectPiece(piece);
        selectOrigin(row, col);
      }
      // /TESTING
      if ((pieceToMove === 'K' || pieceToMove === 'k')) {
        const [rowStart, colStart] = originSquare;
  
          castleKing(rowStart, colStart, row, col, pieceToMove);
          selectPiece(null);
          selectOrigin(null, null);
          toggleTurn();
        
      } else 
      if (pieceToMove !== null && (this.isWhite(piece) !== this.isWhite(pieceToMove)) && this.validateDestination()) {
        if (pieceToMove === 'n' || pieceToMove === 'N') {
          this.placePiece();
        } else {
          if (validatePath(originSquare, [row,col], currentPosition)) {
            this.placePiece();
          } 
        }
      }
    }
    
  }

  validateDestination() {
    const { originSquare, pieceToMove, row, col, piece } = this.props;
    const [rowStart, colStart] = originSquare;
    const selection = pieceToMove.toUpperCase();

    ///TESTING
    if (selection === 'P') {
      return (baseMoves['P'](rowStart, colStart, row, col, piece, pieceToMove));
    } else {
      return (baseMoves[selection](rowStart, colStart, row, col));
    }
  }

  highlight() {
    const { row, col, piece, originSquare } = this.props;
    if (originSquare !== null) {
      const [rowStart, colStart] = originSquare;
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
  const { pieceToMove, originSquare, currentPosition, whiteToMove, moveList, userId, gameState } = state;
  return { pieceToMove, originSquare, currentPosition, whiteToMove, moveList, userId, gameState };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ castleKing, selectPiece, selectOrigin, updateMatrix, toggleTurn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);

