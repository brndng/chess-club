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
    const { selectOrigin, originSquare, placed, togglePlaced } = this.props;
    const { coordinate } = this.state;
    if (coordinate === originSquare && placed) {
      this.setState({ currentPiece: null })
      selectOrigin(null);
      togglePlaced();
    }  
  }

  initColor() {
    const { file, rank } = this.props;
    const files = 'abcdefgh';
    return (
      ((files.indexOf(file) + 1) % 2 === 0 && rank % 2 === 0) ||
      ((files.indexOf(file) + 1) % 2 !== 0 && rank % 2 !== 0)
    ) ? 'black' : 'white';
  }

  checkValidSquare(){
    //returns boolean
  }

  movePiece() {
    const { pieceToMove, togglePlaced } = this.props;
    const { currentPiece } = this.state;
    this.setState({ currentPiece: pieceToMove });
    togglePlaced();
  }

  handleMoveConditions() {
    const { selectPiece, selectOrigin, pieceToMove } = this.props;
    const { currentPiece, coordinate } = this.state;
    selectPiece(currentPiece);
    if (currentPiece !== null) {
      selectOrigin(coordinate);
    }
    if (pieceToMove && currentPiece === null) {
      this.movePiece();
    }
  }

  render() {
    const { currentPiece, coordinate } = this.state;
    return (
      <div className="square" id={this.initColor()} onClick={() => {this.handleMoveConditions()}}>
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