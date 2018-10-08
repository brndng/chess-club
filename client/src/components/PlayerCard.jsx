import React, { Component } from "react";
import { connect } from "react-redux";
import { printCapturedPieces } from "../../../rules/utilities/";

class PlayerCard extends Component {
  constructor(props) {
    super(props);
  }

  generateClasses() {
    const { user, opponent, player, isMyTurn } = this.props;
    return [
      "player-card-container",
      ((isMyTurn && player.id === user.id) ||
        (!isMyTurn && player.id === opponent.id)) &&
        "is-my-turn"
    ]
      .filter(cls => !!cls)
      .join(" ");
  }

  render() {
    const { player, game, moves, index } = this.props;
    const capturedPieces = printCapturedPieces(player.id, game, moves, index);
    const classes = this.generateClasses();
    return (
      <div className={classes}>
        <div className="player-card">
          <div className="player-card-username">
            <strong>{`▧  ${player.username}`}</strong>
          </div>
          <div className="player-card-pieces">
            {capturedPieces.map((piece, i) => (
              <div className="captured-piece" key={i}>
                {piece}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  user,
  opponent,
  game,
  moves,
  whiteToMove,
  isMyTurn
}) => {
  return { user, opponent, game, moves, whiteToMove, isMyTurn };
};

export default connect(mapStateToProps)(PlayerCard);
