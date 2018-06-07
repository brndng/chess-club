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
import Promotion from './Promotion.jsx';
import verifyLegalSquare from '../../rules/movement/';
import { isKingInCheck, evaluateCheckmateConditions } from '../../rules/interactions/';
import { 
  initGame,
  updatePosition, 
  toggleTurn, 
  updateCheckStatus,
  declareGameOver } from '../actions/';

axios.defaults.withCredentials = true;

class Game extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      id: +id,
      socket: null,
      opponentId: null,
    }
  }

  async componentDidMount() {
    const { userId, initGame, updatePosition, updateCheckStatus, declareGameOver } = this.props;
    const { id } = this.state;
    const game = await axios.get(`http://localhost:3000/games/${id}`);
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

    initGame(game.data);

    const opponentId = userId === game.data.white 
      ? game.data.black
      : game.data.white;

    this.setState({ opponentId });
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
    if (window.confirm('Are you sure you want to resign?')) {
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
  }

  offerDraw() {
    console.log('offer draw clicked')
    const { userId } =  this.props;
    const { id } = this.state;
    this.socket.emit('draw_offer', { userId, id })
  }

  render() {
    const { userId, game, whiteToMove, moves } = this.props;
    const { id, opponentId } = this.state;

    return (
      game !== null 
        && opponentId !== null
        && <div className="game-container">
             <Board />
             <div className="game-info">
               <PlayerCard id={opponentId} />
               <GameDisplay id={id} socket={this.socket} />
               <div className="game-options">
                 <button onClick={() => {this.resign()}}>RESIGN</button>
                 <button onClick={() => {this.offerDraw()}}>OFFER DRAW</button>
               </div>
               <PlayerCard id={userId} />
             </div>
             <Draw id={id} socket={this.socket} />
             <Promotion />
           </div>
    );
  }
}

const mapStateToProps = ({ userId, moves, game, currentPosition, whiteToMove, inCheck, lastPromoted }) => {
  return { userId, moves, game, currentPosition, whiteToMove, inCheck, lastPromoted }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ initGame, updatePosition, toggleTurn, updateCheckStatus, declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game);

