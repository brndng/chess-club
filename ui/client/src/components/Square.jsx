import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import selectPiece from '../actions/action-select-piece.js';
import selectOrigin from '../actions/action-select-origin.js';

class Square extends Component {
  constructor(props) {
    super(props);
    const { file, rank, pieces } = props;
    const coordinate = file+rank;
    this.state = { 
      currentPiece: pieces[coordinate] || null,
      coordinate,
    }
  }

  // getSnapshotBeforeUpdate?

  componentDidUpdate() {
    const { selectPiece, selectOrigin, originSquare, placed, togglePlaced, toggleTurn } = this.props;
    const { coordinate } = this.state;
    if (coordinate === originSquare && placed) {
      this.setState({ currentPiece: null });
      selectPiece(null);
      selectOrigin(null);
      togglePlaced();
      toggleTurn();
    }  
  }

  initSquareColor() {
    const { file, rank } = this.props;
    const files = 'abcdefgh';
    return (
      ((files.indexOf(file) + 1) % 2 === 0 && rank % 2 === 0) ||
      ((files.indexOf(file) + 1) % 2 !== 0 && rank % 2 !== 0)
    ) ? 'black' : 'white';
  }

  isWhite(piece) {
    if (piece === null) {
      return null;
    }
    return piece === piece.toLowerCase() ? false : true;
  }

  checkValidSquare() {
    //returns boolean
  }

  movePiece() {
    const { pieceToMove, togglePlaced } = this.props;
    const { currentPiece } = this.state;
    this.setState({ currentPiece: pieceToMove });
    togglePlaced();
  }

  handleMoveConditions() {
    const { selectPiece, selectOrigin, pieceToMove, whiteToMove } = this.props;
    const { currentPiece, coordinate } = this.state;
    const { isWhite } = this;

    if ((isWhite(currentPiece) === whiteToMove)) { 
      selectPiece(currentPiece);
      selectOrigin(coordinate);
    }
    if (pieceToMove !== null && (isWhite(currentPiece) !== isWhite(pieceToMove))) {
      movePiece();
    }
  }

  render() {
    const { currentPiece, coordinate } = this.state;
    return (
      <div 
        className="square" 
        id={this.initSquareColor()} 
        onClick={() => {this.handleMoveConditions()}}
      >
        {currentPiece === null ? null : 
          <button>
            {currentPiece}
          </button>
        }
      </div>
    )
  }
}
// mapStatetoProps: takes data from store, passes it to component as props
const mapStatetoProps = (state) => {
  return {
    pieces: state.pieces,
    pieceToMove: state.pieceToMove,
    originSquare: state.originSquare,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece, selectOrigin }, dispatch);
}

export default connect(mapStatetoProps, matchDispatchToProps)(Square);