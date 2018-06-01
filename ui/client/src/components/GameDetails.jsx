import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class GameDetails extends Component {
  constructor(props) {
    super(props);
  }

  displayTurn() {
    const { whiteToMove } = this.props;
    return whiteToMove
      ? 'White To Move'
      : 'Black To Move'
  }

  displayWinStatus() {
    return null;
  }

  render() {
    return (
      <div className="game-details">
        <div>{this.displayTurn()}</div>
        <div>{this.displayWinStatus()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ whiteToMove, moves }) => {
  return { whiteToMove, moves };
}

export default connect(mapStateToProps)(GameDetails);