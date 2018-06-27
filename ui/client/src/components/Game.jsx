import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import BoardContainer from './BoardContainer.jsx';
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
  selectPiece,
  updateCheckStatus,
  declareGameOver, } from '../actions/';

axios.defaults.withCredentials = true;

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
    const game = await axios.get(`${process.env.PATH}:${process.env.PORT}/games/${id}`);

    this.socket = await io(`${process.env.PATH}:${process.env.PORT}/`);

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
    initGame(user.id, game.data); 
    this.initOpponent(game.data);
  }

  componentDidUpdate(prevProps) {
    const { user, opponent, selection, game, currentPosition, positionHistory, moves, whiteToMove, toggleTurn, selectPiece, updateCheckStatus, inCheck } = this.props;
    const { id } = this.state;
    const { white, black } = game;
    const currMove= prevProps.moves.slice(-1)[0];
    const newMove = moves.slice(-1)[0];
    const _isKingInCheck = isKingInCheck(user.id, white, currentPosition, moves);
    
    if (
      prevProps.game !== null
      && id === prevProps.game.id 
      && newMove 
      && !areEqual(currMove, newMove)
     ) { 
      const destin = newMove[1];
      const prevPosition = positionHistory.slice(-1)[0];
      const prevMoves = moves.slice(0, moves.length - 1);
        if ((user.id === white) === whiteToMove) {
          axios.put(`${process.env.PATH}:${process.env.PORT}/games/move`, { 
            id,
            user, 
            game,
            selection, 
            destin,
            prevPosition,
            currentPosition, 
            positionHistory,
            prevMoves, 
            moves,
            whiteToMove,
          });
        }
      this.socket.emit('move', { id, newMove });
      toggleTurn(user.id, white, whiteToMove);
      selectPiece(null, null);
    }

    if (_isKingInCheck && prevProps.inCheck !== user.id) {
      const _checkMate = evaluateCheckmateConditions(user.id, white, currentPosition, moves);
      if(_checkMate) {
        this.socket.emit('checkmate', { userId: user.id, id });
        axios.put(`${process.env.PATH}:${process.env.PORT}/games/document`, { 
          id, 
          user,
          moves,
          white,
          completed: true,
          winner: opponent.id,
        });
      }
      this.socket.emit('check', { userId: user.id, id });
      axios.put(`${process.env.PATH}:${process.env.PORT}/games/check`, { id, inCheck: user.id });
    }

    if (!_isKingInCheck && prevProps.inCheck === user.id) {
      this.socket.emit('check', { userId: null, id });
      axios.put(`${process.env.PATH}:${process.env.PORT}/games/check`, { id, inCheck: null });
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
    
    const opponent = await axios.get(`${process.env.PATH}:${process.env.PORT}/users/profile/${opponentId}`);
    storeOpponent(opponent.data);
  }

  render() {
    const { user, opponent, game, whiteToMove, moves } = this.props;
    const { id } = this.state;
    const maxIndex = moves.length;
    const loadedComponent = (game !== null && opponent !== null && this.socket)
      ? <div className="game-container">
          <BoardContainer index={maxIndex - 1} />
          <div className="game-info">
            <PlayerCard player={opponent} index={maxIndex} />
            <GameDisplay id={id} socket={this.socket} />
            <div className="game-options">
              <Draw id={id} socket={this.socket} />
              <Resignation id={id} socket={this.socket} />
            </div>
            <PlayerCard player={user} index={maxIndex}/>
          </div>
            <Checkmate id={id} socket={this.socket} />
            <Promotion />
        </div>
      : <div>Loading...</div>;

   return loadedComponent;
  }
}

const mapStateToProps = ({ user, opponent, selection, moves, game, currentPosition, positionHistory, whiteToMove, inCheck, lastPromoted }) => {
  return { user, opponent, selection, moves, game, currentPosition, positionHistory, whiteToMove, inCheck, lastPromoted }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ initGame, storeOpponent, updatePosition, toggleTurn, selectPiece, updateCheckStatus, declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game);



