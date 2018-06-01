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

  render() {
    return (
      <div>
        {this.displayTurn()}
      </div>
    );
  }
}

const mapStateToProps = ({ whiteToMove, moves }) => {
  return { whiteToMove, moves };
}

export default connect(mapStateToProps)(GameDetails);