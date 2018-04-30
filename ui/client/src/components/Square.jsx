import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Piece from './Piece.jsx';
import selectPiece from '../actions/action-select-piece.js';
import selectOrigin from '../actions/action-select-origin.js';
import storeCandidates from '../actions/action-store-candidates.js';
import baseMoves from '../../base-moves.js';
import pathLimits from '../../path-limits.js'; ///
import updateMatrix from '../actions/action-update-matrix.js'; ///
import togglePlaced from '../actions/action-toggle-placed.js';
import toggleTurn from '../actions/action-toggle-turn.js';

class Square extends Component {
  constructor(props) {
    super(props);
    // const { file, rank, pieces } = props;
    // const coordinate = file+rank;
    // const currentPiece = pieces[coordinate] || null;
    // this.state = { currentPiece, coordinate }
    // const { piece } = this.props;
    // const piece = piece || null;
    // this.state = { piece }
  }

  // componentDidUpdate() {
  //   const { selectPiece, selectOrigin, originSquare, placed, togglePlaced, toggleTurn } = this.props;
  //   const { coordinate } = this.state;
  //   if (coordinate === originSquare && placed) {
  //     this.setState({ currentPiece: null });
  //     selectPiece(null);
  //     selectOrigin(null);
  //     togglePlaced();
  //     toggleTurn();
  //   }  
  // }

  initSquareColor() {
    const { row, col } = this.props;
    return (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ?
      'white' : 'black';
  }

  handleSquareClick() {
    const { updateMatrix, selectPiece, selectOrigin, row, col, piece, togglePlaced, toggleTurn, whiteToMove, pieceToMove, originSquare } = this.props;
    
    const { isWhite } = this;
    console.log('piece, isWhite(piece), whiteToMove',piece, isWhite(piece), whiteToMove);
    if ((isWhite(piece) === whiteToMove)) { 
      selectPiece(piece);
      selectOrigin(row, col);
    }

    if (pieceToMove !== null && (isWhite(piece) !== isWhite(pieceToMove))) {
      const rowStart = originSquare.row;
      const colStart = originSquare.col;
      updateMatrix(pieceToMove, rowStart, colStart, row, col);
      togglePlaced();
      toggleTurn();
    }
  }

  isWhite(piece) {
    if (piece === null) {
      return null;
    }
    return piece === piece.toUpperCase() ? true : false;
  }

  // getCandidateSquares() {
  //   const { file, rank, files, storeCandidates } = this.props;
  //   const { currentPiece, coordinate } = this.state;
  //   const squares = []
  //   const piece = currentPiece.toUpperCase();
  //   for (let i=0; i<files.length; i++) {
  //     for (let j=1; j<9; j++) {
  //       if (baseMoves[piece](file, rank, files[i], j)) {
  //         squares.push(files[i]+j);
  //       }
  //     }
  //   }
  //   storeCandidates(squares);
  // }

  // placePiece() {
  //   const { pieceToMove, togglePlaced, updateMatrix } = this.props;
  //   const { currentPiece } = this.state;
  //   this.setState({ currentPiece: pieceToMove });
  //   togglePlaced();
  //   updateMatrix('x');///
  // }

  // handleSquareClick() {
  //   const { selectPiece, selectOrigin, pieceToMove, whiteToMove, candidateSquares } = this.props;
  //   const { currentPiece, coordinate } = this.state;
  //   const isWhite = this.isWhite.bind(this);
  //   const getCandidateSquares = this.getCandidateSquares.bind(this);
  //   const placePiece = this.placePiece.bind(this);
  //   // const { isWhite, getCandidateSquares, placePiece } = this;

  //   if ((isWhite(currentPiece) === whiteToMove)) { 
  //     selectPiece(currentPiece);
  //     selectOrigin(coordinate);
  //     getCandidateSquares();
  //   }
  //   if (pieceToMove !== null && (isWhite(currentPiece) !== isWhite(pieceToMove)) && candidateSquares.includes(coordinate)) {
  //     placePiece();
  //   }
  // }

  // render() {
  //   const { file, rank } = this.props;
  //   const { currentPiece, coordinate } = this.state;
  //   return (
  //     <div 
  //       className="square" 
  //       id={this.initSquareColor()} 
  //       onClick={() => {this.handleSquareClick()}}
  //     >
  //       {currentPiece === null ? null : <Piece currentPiece={currentPiece} file={file} rank={rank}/>}
        
  //     </div>
  //   )
  // }

  render() {
    const { piece } = this.props;
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
    candidateSquares: state.candidateSquares,
    currentPosition: state.currentPosition,
    whiteToMove: state.whiteToMove,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, selectOrigin, storeCandidates, updateMatrix, togglePlaced, toggleTurn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Square);

// getSnapshotBeforeUpdate?

// calculateDistance(fromFile, fromRank, toFile, toRank) {
//   fromFile = fromFile.charCodeAt()-96;
//   toFile = toFile.charCodeAt()-96;
//   return Math.sqrt(Math.pow(toRank-fromRank, 2) - Math.pow(toFile-fromFile, 2));
// }

// test() {
//   const { originSquare, pieceToMove, file, rank, candidateSquares} = this.props;
//   const piece = pieceToMove.toUpperCase();
//   const fromFile = originSquare.split('')[0];
//   const fromRank = Number(originSquare.split('')[1]);
//   const maxDist = this.calculateDistance(fromFile, fromRank, file, rank)
//   pathLimits[piece](fromFile, fromRank, file, rank, maxDist);
// }