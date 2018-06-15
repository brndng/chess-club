import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Board from './Board.jsx';
import GameDisplay from './GameDisplay.jsx';
import MoveHistory from './MoveHistory.jsx';
import PlayerCard from './PlayerCard.jsx';
import { 
  initGame,
  storeOpponent,
  toggleTurn, 
  loadSnapshot,
  loadTurn, } from '../actions/';

axios.defaults.withCredentials = true;

class CompletedGame extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      id: +id,
      index: null,
    }
  }

  async componentDidMount() {    
    const { user, initGame } = this.props;
    const { id } = this.state;
    const game = await axios.get(`http://localhost:3000/games/${id}`);
    initGame(user.id, game.data); 
    this.initOpponent(game.data);
    this.setState({
      index: game.data.moves.length,
    });
  }

  async initOpponent(game) {
    const { user, storeOpponent } = this.props;
    const opponentId = user.id === game.white 
      ? game.black
      : game.white;
    
    const opponent = await axios.get(`http://localhost:3000/users/profile/${opponentId}`);
    storeOpponent(opponent.data);
  }

  displayInitPosition() {
    const { user, game, positionHistory, loadSnapshot, loadTurn } = this.props;    
    const { index } = this.state;

    this.setState({
      index: 0,
    }, () => {
      loadSnapshot(positionHistory[this.state.index]);
      loadTurn(user.id, game.white, this.state.index);
    });
  }

  displayPrevPosition() {
    const { user, game, positionHistory, loadSnapshot, loadTurn } = this.props;
    const { index } = this.state;

    if (positionHistory[index - 1]) {
      this.setState({
        index: index - 1,
      }, () => {
        loadSnapshot(positionHistory[this.state.index]);
        loadTurn(user.id, game.white, this.state.index);
      });
    } 
  }

  displayNextPosition() {
    const { user, game, positionHistory, loadSnapshot, loadTurn } = this.props;
    const { index } = this.state;

    if (positionHistory[index + 1]) {
      this.setState({
        index: index + 1,
      }, () => {
        loadSnapshot(positionHistory[this.state.index]);
        loadTurn(user.id, game.white, this.state.index);
      });
    }
  }

  displayLastPosition() {
    const { user, game, positionHistory, loadSnapshot, loadTurn } = this.props;
    const { index } = this.state;
    this.setState({
      index: positionHistory.length - 1,
    }, () => {
      loadSnapshot(positionHistory[this.state.index]);
      loadTurn(user.id, game.white, this.state.index);
    });
  }

  render() {
    const { user, opponent, game } = this.props;
    const { id, index } = this.state;
    const loadedComponent = (game !== null && opponent !== null && index !== null)
      ? <div className="game-container">
          <Board />
          <div className="game-info">
            <PlayerCard player={opponent} index={index} />
            <div className="game-display">
            <MoveHistory index={index - 1}/>
          </div>
            <div className="game-options">
              <button onClick={() => this.displayInitPosition()}>◀◀</button>
              <button onClick={() => this.displayPrevPosition()}>◀ </button>
              <button onClick={() => this.displayNextPosition()}>▶ </button>
              <button onClick={() => this.displayLastPosition()}>▶▶</button>
            </div>
            <PlayerCard player={user} index={index}/>
          </div>
        </div>
      : <div>Loading...</div>;

    return loadedComponent;
  
  }
}

const mapStateToProps = ({ user, opponent, game, positionHistory }) => {
  return { user, opponent, game, positionHistory }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ initGame, storeOpponent, toggleTurn, loadSnapshot, loadTurn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CompletedGame);
