import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';
import GameDisplay from './GameDisplay.jsx';
import PlayerCard from './PlayerCard.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { isKingInCheck, evaluateCheckmateConditions } from '../../rules/utilities';
import { 
  initGame,
  updatePosition, 
  toggleTurn, 
  updateCheckStatus,
  declareGameOver } from '../actions/';

class Game extends Component {
  constructor(props) {
    super(props);
    const { id } = props.location.state;
    this.state = {
      id,
      socket: null,
    }
  }

  async componentDidMount() {
    const { userId, initGame, updatePosition, updateCheckStatus, declareGameOver } = this.props;
    const { id } = this.state;
    const game = await axios.get(`http://localhost:3000/games/${id}`);

    // this.socket = await io(`http://localhost:1337/`, { 'forceNew': true });
    this.socket = await io(`http://localhost:1337/`);

    this.socket.on('connect', () => {
      this.setState({ socket: this.socket.id });
      this.socket.emit('game_id', id);
    });
    this.socket.on('guest', (data) => console.log(`someone has joined game room ${data}`));
    this.socket.on('move', (newMove) => {
      let currMove = this.props.moves.slice(-1)[0];
      if (JSON.stringify(currMove) !== JSON.stringify(newMove)) {
        updatePosition(...newMove, this.props.moves);
      }
    });
    this.socket.on('check', (player) => {
      if (this.props.inCheck !== player) {
        updateCheckStatus(player);
      }
    });
    this.socket.on('game_over', (player) => {
      console.log(`Player ${player} has been CHECKMATED`);
      declareGameOver();
      if (userId !== player) {
        console.log(`YOU WIN`);
      } else {
        console.log(`YOU LOSE`);
      }
    });
    this.socket.on('draw', (player) => {
      declareGameOver();
      if (userId !== player) {
        console.log(`Player ${player} has offered a draw`);
      }
    });

    initGame(game.data);
  }

  componentDidUpdate(prevProps) {
    const { userId, currentPosition, moves, whiteToMove, toggleTurn, game, updateCheckStatus, inCheck } = this.props;
    const { id } = this.state;
    const currMove= prevProps.moves.slice(-1)[0];
    const newMove = moves.slice(-1)[0];
    const _isKingInCheck = isKingInCheck(userId, game.white, currentPosition, moves);

    if (
      prevProps.game !== null
      && id === prevProps.game.id 
      && newMove 
      && JSON.stringify(newMove) !== JSON.stringify(currMove)
     ) { 
      this.socket.emit('move', { newMove, id });
      axios.put(`http://localhost:3000/games/move`, { id, currentPosition, moves, whiteToMove });
      toggleTurn();
    }

    if (_isKingInCheck && prevProps.inCheck !== userId) {
      const _checkMate = evaluateCheckmateConditions(userId, game.white, currentPosition, moves);
      if(_checkMate) {
        this.socket.emit('game_over', { userId, id });
      }
      this.socket.emit('check', { userId, id });
      axios.put(`http://localhost:3000/games/check`, { id, inCheck: userId });
    }

    if (!_isKingInCheck && prevProps.inCheck === userId) {
      this.socket.emit('check', { userId: null, id });
      axios.put(`http://localhost:3000/games/check`, { id, inCheck: null });
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  resign() {
    const { userId, game } =  this.props;
    const { id } = this.state;
    const opponentId = userId === game.white ? game.black : game.white;
    this.socket.emit('game_over', { userId, id });
    axios.put(`http://localhost:3000/games/document`, { 
      id, 
      completed: true,
      winner: opponentId,
    });
  }

  offerDraw() {
    const { userId } =  this.props;
    const { id } = this.state;
    this.socket.emit('draw', { userId, id })
  }

  render() {  
    const { game, whiteToMove } = this.props;
    const { id } = this.state;
    // console.log('\t game id:', id);
    return (
      game !== null 
        && <div className="game-container">
            <Board />
            <div className="game-info">
              <PlayerCard />
              <GameDisplay id={id} socket={this.socket}/>
              <div className="game-options">
                <button onClick={() => {this.resign()}}>RESIGN</button>
                <button onClick={() => {this.offerDraw()}}>OFFER DRAW</button>
              </div>
              <PlayerCard />
            </div>
          </div>
    );
  }
}

const mapStateToProps = ({ userId, moves, game, currentPosition, whiteToMove, inCheck }) => {
  return { userId, moves, game, currentPosition, whiteToMove, inCheck }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ initGame, updatePosition, toggleTurn, updateCheckStatus, declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game);

