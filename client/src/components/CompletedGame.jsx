import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import adapter from "../adapter";
import BoardContainer from "./BoardContainer.jsx";
import GameDisplay from "./GameDisplay.jsx";
import MoveHistory from "./MoveHistory.jsx";
import PlayerCard from "./PlayerCard.jsx";
import { initGame, storeOpponent, loadSnapshot, loadTurn } from "../actions/";

class CompletedGame extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      id: +id,
      index: null
    };
  }

  async componentDidMount() {
    const { user, initGame } = this.props;
    const { id } = this.state;
    const game = await adapter.get(`/games/${id}`);
    const index = game.data.moves.length;
    initGame(user.id, game.data);
    this.initOpponent(game.data);
    this.setState({
      index
    });
  }

  async initOpponent(game) {
    const { user, storeOpponent } = this.props;
    const opponentId = user.id === game.white ? game.black : game.white;
    const opponent = await adapter.get(`/users/profile/${opponentId}`);
    storeOpponent(opponent.data);
  }

  displayTargetPosition(target) {
    const { user, game, positionHistory, loadSnapshot, loadTurn } = this.props;
    const { index } = this.state;
    let targetIndex;

    switch (target) {
      case "INIT":
        targetIndex = 0;
        break;
      case "PREV":
        targetIndex = index - 1;
        break;
      case "NEXT":
        targetIndex = index + 1;
        break;
      case "LAST":
        targetIndex = positionHistory.length - 1;
        break;
      default:
        targetIndex = index;
    }

    if (positionHistory[targetIndex]) {
      this.setState(
        {
          index: targetIndex
        },
        () => {
          loadSnapshot(positionHistory[this.state.index]);
          loadTurn(user.id, game.white, this.state.index);
        }
      );
    }
  }

  render() {
    const { user, opponent, game } = this.props;
    const { id, index } = this.state;
    const currMoveIndex = index - 1;
    const loadedComponent =
      game !== null && opponent !== null && index !== null ? (
        <div className="game-container">
          <BoardContainer index={currMoveIndex} />
          <div className="game-panel">
            <PlayerCard player={opponent} index={currMoveIndex} />
            <div className="game-info">
              <div />
              <div className="game-display">
                <div className="game-display-toggle" />
                <MoveHistory index={currMoveIndex} />
              </div>
              <div className="game-options">
                <div>
                  <button onClick={() => this.displayTargetPosition("INIT")}>
                    ◀◀
                  </button>
                </div>
                <div>
                  <button onClick={() => this.displayTargetPosition("PREV")}>
                    ◀{" "}
                  </button>
                </div>
                <div>
                  <button onClick={() => this.displayTargetPosition("NEXT")}>
                    ▶{" "}
                  </button>
                </div>
                <div>
                  <button onClick={() => this.displayTargetPosition("LAST")}>
                    ▶▶
                  </button>
                </div>
              </div>
            </div>
            <PlayerCard player={user} index={currMoveIndex} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      );

    return loadedComponent;
  }
}

const mapStateToProps = ({ user, opponent, game, positionHistory }) => {
  return { user, opponent, game, positionHistory };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    { initGame, storeOpponent, loadSnapshot, loadTurn },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(CompletedGame);
