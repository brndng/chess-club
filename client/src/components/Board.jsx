import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square.jsx';
import SoundPlayer from '../lib/sound-player.js';
import { srcMove, srcCapture } from '../lib/sounds';
import { rotateBoard, isEqual } from '../../../rules/utilities/';

class Board extends Component {
  constructor(props) {
    super(props);
    this.moveSound = new SoundPlayer(srcMove);
    this.captureSound = new SoundPlayer(srcCapture);
  }

  componentDidUpdate(prevProps) {
    const { currentPosition, moves, index } = this.props;
    const wasCaptured = index > 0 && moves[index][3];

    if (!isEqual(prevProps.currentPosition, currentPosition)) {
      if (wasCaptured) {
        this.captureSound.play();
      }
      this.moveSound.play();
    }
  }

  render() {
    const { user, game, currentPosition, completed, isMyTurn } = this.props;
    const positionRotated = rotateBoard(currentPosition);
    const classes = [
      'board',
      isMyTurn && !completed && 'is-my-turn'
    ].filter(cls => !!cls).join(' ');

    return user.id === game.white
      ? <div className={classes}>{currentPosition.map((row, i) =>
        <div className="row" key={i}>{row.map((elem, j) => {
          let coords = { row: i, col: j };
          return <Square piece={elem} coords={coords} key={[coords.row, coords.col]} />
        })}
        </div>)}
      </div>
      : <div className={classes}>{positionRotated.map((row, i) =>
        <div className="row" key={i}>{row.map((elem, j) => {
          let coords = { row: positionRotated.length - 1 - i, col: row.length - 1 - j };
          return <Square piece={elem} coords={coords} key={[coords.row, coords.col]} />
        })}
        </div>)}
      </div>
  }
}

const mapStateToProps = ({ user, game, currentPosition, moves, whiteToMove, completed, isMyTurn }) => {
  return { user, game, currentPosition, moves, whiteToMove, completed, isMyTurn };
}

export default connect(mapStateToProps)(Board);
