import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { isWhite, isKingInCheck } from '../../rules/utilities';
import { selectPiece, updatePosition } from '../actions/'; 
class Square extends Component {
  constructor(props) {
    super(props);
  }

  initSquareColor() {
    const { coords } = this.props;
    const { row, col } = coords;
    return (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ?
      'white' : 'black';
  }

  highlight() {
    const { coords, selection } = this.props;
    if (selection !== null ) {
      const { origin } = selection;
      return coords.row === origin.row && coords.col === origin.col ?
        'highlight' : null;
    }
    return null;
  }

  handleSquareClick() {
    const { userId, game, selection, selectPiece, coords, piece, whiteToMove, currentPosition } = this.props;
    if ((userId === game.white) === whiteToMove) {
      if ((isWhite(piece) === whiteToMove)) { 
        selectPiece({...coords}, piece);
      }
      if (selection !== null && (isWhite(piece) !== isWhite(selection.piece))) {
        if (verifyLegalSquare(selection.piece, selection.origin, coords, currentPosition)) {
          this.placeSelectedPiece(); 
        }
      }
    }
  }

  placeSelectedPiece() {
    const { userId, selectPiece, updatePosition, selection, coords, currentPosition, game } = this.props;
    const { origin } = selection;
    
    const preview = currentPosition.map(row => row.slice());
    preview[coords.row][coords.col] = selection.piece;
    preview[origin.row][origin.col] = null;

    if (!isKingInCheck(userId, game.white, preview)) {
      updatePosition(origin, coords, selection.piece);
      selectPiece(null, null);
      console.log('placed piece by user: ', this.props.userId)
    } else {
      console.log('thats check SON!');
    }
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

const mapStateToProps = ({ selection, currentPosition, whiteToMove, moves, userId, game }) => { 
  return { selection, currentPosition, whiteToMove, moves, userId, game };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, updatePosition }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);







    
