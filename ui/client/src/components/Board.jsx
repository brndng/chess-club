import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square.jsx';
import axios from 'axios';
class Board extends Component {
  constructor(props) {
    super(props);
    const initialPosition = this.props.currentPosition;
    this.state = {
      matrix: initialPosition,
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { currentPosition } = this.props;
    const { matrix } = prevState;
    if (JSON.stringify(matrix) !== JSON.stringify(currentPosition)) {
      this.setState({ matrix: currentPosition });
    }
  }

  render() {
    return (
      <div>
        <div className="board">
        {this.state.matrix.map((row, i) => 
          <div className="row" key={i}>{row.map((elem, j) => 
            <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
          </div>)}
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPosition: state.currentPosition,
  }
}

export default connect(mapStateToProps)(Board);