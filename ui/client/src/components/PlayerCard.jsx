import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { printCapturedPieces } from '../../../../rules/utilities/';

axios.defaults.withCredentials = true;

class PlayerCard extends Component {
  constructor(props) {
    super(props);
  }

  indicateTurn() {
    const { player, game, whiteToMove } = this.props;
    return (
      (player.id === game.white && whiteToMove) 
      || (player.id !== game.white && !whiteToMove)
    )
      ? 'is-my-turn'
      : null;
  }

  render() {
    const { player, game, moves } = this.props;
    const capturedPieces = printCapturedPieces(player.id, game, moves);
    
    return (
      <div className={`player-card-container ${this.indicateTurn()}`}>
        <div className="player-card-username">
          <strong>{player.username}</strong>
        </div>
        <div className="player-card-pieces">
          {capturedPieces.map((piece, i) => (
            <div className="captured-piece" key={i}>
              {piece}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game, moves, whiteToMove }) => {
  return { game, moves, whiteToMove }
}

export default connect(mapStateToProps)(PlayerCard);