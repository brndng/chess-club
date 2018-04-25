import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import selectPiece from '../actions';

class Square extends Component {
  constructor(props) {
    super(props);
    const { file, rank, pieces } = props;
    this.state = { 
      currentPiece: pieces[file+rank] || null,
      validMoveOption: false,
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

  render() {
    const { currentPiece } = this.state;
    const { file, rank, selectPiece } = this.props;
    return (
      <div className="square" id={this.initColor()} onClick={() => {selectPiece(currentPiece)}}>
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
    selectedPiece: state.selectedPiece,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPiece }, dispatch);
}

export default connect(mapStatetoProps, matchDispatchToProps)(Square);