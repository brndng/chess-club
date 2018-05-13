import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square.jsx';
import axios from 'axios';
import { rotateBoard } from '../../rules/helpers/';
class Board extends Component {
  constructor(props) {
    super(props);
    const initialPosition = this.props.currentPosition;
    this.state = {
      position: initialPosition,
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { currentPosition } = this.props;
    const { position } = prevState;
    if (JSON.stringify(position) !== JSON.stringify(currentPosition)) {
      this.setState({ position: currentPosition });
    }
  }

  render() {
    const { currentPosition, userId, game } = this.props;
    const { white } = game;
    const positionRotated = rotateBoard(this.state.position);

    return userId === white ? (
      <div>
        <div className="board">
        {this.state.position.map((row, i) => 
          <div className="row" key={i}>{row.map((elem, j) => 
            <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
          </div>)}
       </div>
      </div>) : (
      <div>
        <div className="board">
        {positionRotated.map((row, i) => 
          <div className="row" key={i}>{row.map((elem, j) => 
            <Square piece={elem} row={positionRotated.length-1-i} col={row.length-1-j} key={[i,j]}/>)}
          </div>)}
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    currentPosition: state.currentPosition,
    userId: state.userId,
    game: state.game
  }
}

export default connect(mapStateToProps)(Board);





