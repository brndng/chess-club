import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square.jsx';
import axios from 'axios';
import { rotateBoard } from '../../rules/utilities';
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.currentPosition,
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { currentPosition } = this.props;
    const { position } = prevState;
    if (JSON.stringify(position) !== JSON.stringify(currentPosition)) {
      this.setState({ position: currentPosition });
    }
  }

  indicateTurn() {
    const { userId, whiteToMove, game } = this.props;

    return (
      (userId === game.white && whiteToMove)
      || (userId !== game.white && !whiteToMove)
    );
  }

  render() {
    const { currentPosition, userId, game } = this.props;
    const positionRotated = rotateBoard(this.state.position);

    const classes = [
      'board-container',
      this.indicateTurn() && 'is-my-turn'
    ].filter(cls => !!cls).join(' ');

    return userId === game.white 
      ? <div className={classes}>
          <div className="board">{this.state.position.map((row, i) => 
            <div className="row" key={i}>{row.map((elem, j) => {
              let coords = { row: i, col: j };
              return <Square piece={elem} coords={coords} key={[coords.row, coords.col]} /> })}
            </div>)}
          </div>   
        </div>
      : <div className={classes}>
          <div className="board">{positionRotated.map((row, i) => 
            <div className="row" key={i}>{row.map((elem, j) => {
              let coords = { row: positionRotated.length-1-i, col: row.length-1-j };
              return <Square piece={elem} coords={coords} key={[coords.row, coords.col]} /> })}
            </div>)}
          </div>
        </div>
  }
}

const mapStateToProps = ({ userId, game, currentPosition, whiteToMove }) => {
  return { userId, game, currentPosition, whiteToMove };
}

export default connect(mapStateToProps)(Board);
