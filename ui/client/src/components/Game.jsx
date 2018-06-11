import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';
import GameDisplay from './GameDisplay.jsx';
import PlayerCard from './PlayerCard.jsx';
import Draw from './Draw.jsx';
import Resignation from './Resignation.jsx';
import Promotion from './Promotion.jsx';
import Checkmate from './Checkmate.jsx';
import verifyLegalSquare from '../../../../rules/movement/';
import { isKingInCheck, evaluateCheckmateConditions } from '../../../../rules/interactions/';
import { areEqual } from '../../../../rules/utilities/';
import { 
  initGame,
  storeOpponent,
  updatePosition, 
  toggleTurn, 
  updateCheckStatus,
  declareGameOver, } from '../actions/';

axios.defaults.withCredentials = true;
window.axios = axios;

class Game extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      id: +id,
      socket: null,
    }
  }

  async componentDidMount() {
    const { user, initGame, updatePosition, updateCheckStatus, declareGameOver } = this.props;
    const { id } = this.state;
    const game = await axios.get(`http://localhost:3000/games/${id}`);

    this.socket = await io(`http://localhost:1337/`);

    this.socket.on('connect', () => {
      this.setState({ socket: this.socket.id });
      this.socket.emit('game_id', id);
    });
    this.socket.on('guest', (data) => console.log(`someone has joined game room ${data}`));
    this.socket.on('move', (newMove) => {      
      const currMove = this.props.moves.slice(-1)[0];
      if (!areEqual(currMove, newMove)) {
        updatePosition(...newMove, this.props.moves);
      }
    });
    this.socket.on('check', (player) => {
      if (this.props.inCheck !== player) {
        updateCheckStatus(player);
      }
    });

    initGame(game.data); 
    this.initOpponent(game.data);
  }

  componentDidUpdate(prevProps) {
    const { user, opponent, currentPosition, moves, whiteToMove, toggleTurn, game, updateCheckStatus, inCheck } = this.props;
    const { id } = this.state;
    const currMove= prevProps.moves.slice(-1)[0];
    const newMove = moves.slice(-1)[0];
    const _isKingInCheck = isKingInCheck(user.id, game.white, currentPosition, moves);
    
    if (
      prevProps.game !== null
      && id === prevProps.game.id 
      && newMove 
      && !areEqual(currMove, newMove)
     ) { 
      if ((user.id === game.white) === whiteToMove) {
        axios.put(`http://localhost:3000/games/move`, { id, user, currentPosition, moves, whiteToMove });
      }
      this.socket.emit('move', { newMove, id });
      toggleTurn();
    }

    if (_isKingInCheck && prevProps.inCheck !== user.id) {
      const _checkMate = evaluateCheckmateConditions(user.id, game.white, currentPosition, moves);
      console.log('​Game -> componentDidUpdate -> _checkMate', _checkMate);
      if(_checkMate) {
        this.socket.emit('checkmate', { userId: user.id, id });
        axios.put(`http://localhost:3000/games/document`, { 
          id, 
          user,
          completed: true,
          winner: opponent.id,
        });
      }
      this.socket.emit('check', { userId: user.id, id });
      axios.put(`http://localhost:3000/games/check`, { id, inCheck: user.id });
    }

    if (!_isKingInCheck && prevProps.inCheck === user.id) {
      this.socket.emit('check', { userId: null, id });
      axios.put(`http://localhost:3000/games/check`, { id, inCheck: null });
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  async initOpponent(game) {
    const { user, storeOpponent } = this.props;
    const opponentId = user.id === game.white 
      ? game.black
      : game.white;
    
    const opponent = await axios.get(`http://localhost:3000/users/profile/${opponentId}`);
    storeOpponent(opponent.data);
  }

  render() {
    const { user, opponent, game, whiteToMove, moves } = this.props;
    const { id } = this.state;

    return (
      game !== null 
        && opponent !== null
        && <div className="game-container">
             <Board />
             <div className="game-info">
               <PlayerCard player={opponent} />
               <GameDisplay id={id} socket={this.socket} />
               <div className="game-options">
                 <Draw id={id} socket={this.socket} />
                 <Resignation id={id} socket={this.socket} />
               </div>
               <PlayerCard player={user} />
             </div>
             <Checkmate id={id} socket={this.socket} />
             <Promotion />
           </div>
    );
  }
}

const mapStateToProps = ({ user, opponent, moves, game, currentPosition, whiteToMove, inCheck, lastPromoted }) => {
  return { user, opponent, moves, game, currentPosition, whiteToMove, inCheck, lastPromoted }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ initGame, storeOpponent, updatePosition, toggleTurn, updateCheckStatus, declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game);

