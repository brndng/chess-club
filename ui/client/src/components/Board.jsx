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

  // rotate(grid) {
  //   const copy = [...grid]
  //   copy.reverse().forEach(row => row.reverse());
  //   return copy;
  // }

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
    // const { currentPosition, userId, gameSnapshot } = this.props;
    // const { white } = gameSnapshot;
    // const matrixRotated = this.rotate(this.state.matrix);
    // console.log('userId, white',userId, white)

    // return userId === white ? (
    //   <div>
    //     <div className="board">
    //     {this.state.matrix.map((row, i) => 
    //       <div className="row" key={i}>{row.map((elem, j) => 
    //         <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
    //       </div>)}
    //    </div>
    //   </div>) : (
    //   <div>
    //     <div className="board">
    //     {matrixRotated.map((row, i) => 
    //       <div className="row" key={i}>{row.map((elem, j) => 
    //         <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
    //       </div>)}
    //     </div>
    //   </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    currentPosition: state.currentPosition,
    userId: state.userId,
    gameSnapshot: state.gameSnapshot
  }
}

export default connect(mapStateToProps)(Board);

