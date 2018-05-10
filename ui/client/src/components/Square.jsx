import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
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

  isWhite(piece) {
    if (piece === null) {
      return null;
    }
    return piece === piece.toUpperCase() ? true : false;

    // STYLE
    // return piece === null ? null :
    //   piece === piece.toUpperCase() ? true : false;
    //ALSO order of props destructure?
  }

  handleSquareClick() {
    const { userId, gameSnapshot, selection, selectPiece, row, col, piece, whiteToMove, currentPosition } = this.props;
    const { white } = gameSnapshot;
    if ((userId === white) === whiteToMove) {
      if ((this.isWhite(piece) === whiteToMove)) { 
        selectPiece(row, col, piece);
      }
      if (selection !== null && (this.isWhite(piece) !== this.isWhite(selection.piece))) {
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

// verifyLegalSquare() {
//   const { selection, row, col, currentPosition } = this.props;
//   const [ rowStart, colStart ] = selection.origin;
//   const selectedPiece = selection.piece.toUpperCase();
//   let legal = false;
//   if (baseMoves[selectedPiece](rowStart, colStart, row, col)) {
//     if (selectedPiece === 'N') {
//       legal = true;      
//     } else {
//       if(validatePath(selection.origin, [row, col], currentPosition)) {
//         if(selectedPiece !== 'P' && selectedPiece !== 'K') {
//           legal = true;          
//         } else {
//           if (selectedPiece === 'P') {
//             legal = true;              
//             //if forward
//               //sq piece === null?
//                 //if last rank
//                   //place and promote
//                 //else
//                   //place
//             //if diagonal
//               //sq piece === null?
//                 //en passant conditions?
//                   //place
//             //else
//               //place
//           }
//           if (selectedPiece === 'K') {
//             legal = true;              
//             //if inCheck
//               //if 1 sq
//                 //place
//             //else
//               //if 1 sq
//                 //place
//               //if 2 sq
//                 //castle
//           }
//         }
//       } 
//     }      
//   }
//   return legal;
// }



    
