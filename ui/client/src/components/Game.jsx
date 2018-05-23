import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { isKingInCheck, evaluateCheckmateConditions } from '../../rules/utilities';
import { 
  initGame,
  updatePosition, 
  toggleTurn, 
  updateCheckStatus,
  updateGameOver } from '../actions/';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
    }
  }

  async componentDidMount() {
    const { userId, initGame, updatePosition, updateCheckStatus, updateGameOver } = this.props;
    const { id } = this.props.location.state;
    const game = await axios.get(`http://localhost:3000/games/${id}`);

    this.socket = await io(`http://localhost:1337/`);
    this.socket.on('connect', () => {
      console.log('\tsocketID', this.socket.id)
      this.socket.emit('game_id', id)
    });
    
    this.socket.on('guest', (data) => console.log(`someone has joined game room ${data}`))
    this.socket.on('chat', (message) => {
      this.setState({ 
        messages: [...this.state.messages, message], 
        message: '' 
      });
    })
    this.socket.on('move', (newMove) => {
      let currMove = this.props.moves.slice(-1)[0];
      if (JSON.stringify(currMove) !== JSON.stringify(newMove)) {
        updatePosition(...newMove, this.props.moves);
      }
    });
    this.socket.on('check', (player) => {
      if (this.props.inCheck !== player) {
        console.log(`Player ${player} is in CHECK`)
        updateCheckStatus(player);
      }
    });
    this.socket.on('game_over', (player) => {
      console.log(`Player ${player} has been CHECKMATED`);
      updateGameOver();
      if (userId !== player) {
        console.log(`YOU WIN`);
      } else {
        console.log(`YOU LOSE`);
      }
    });
    
    this.socket.on('draw', (player) => {
      updateGameOver();
      if (userId !== player) {
        console.log(`Player ${player} has offered a draw`)
      }
    });

    initGame(game.data);
  }

  async componentDidUpdate(prevProps) {
    const { userId, currentPosition, moves, whiteToMove, toggleTurn, game, updateCheckStatus, inCheck } = this.props;
    const { id } = this.props.location.state;
    const currMove= prevProps.moves.slice(-1)[0];
    const newMove = moves.slice(-1)[0];
    const _isKingInCheck = isKingInCheck(userId, game.white, currentPosition, moves);

    if (newMove && JSON.stringify(newMove) !== JSON.stringify(currMove)) { 
      console.log('//////CDU!!!!!')

      this.socket.emit('move', { newMove, id });
      axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moves, whiteToMove, inCheck });
      toggleTurn();
    }

    if (_isKingInCheck && prevProps.inCheck !== userId) {
      const _checkMate =  evaluateCheckmateConditions(userId, game.white, currentPosition, moves);
      if(_checkMate) {
        this.socket.emit('game_over', { userId, id });
      }
      
      this.socket.emit('check', { userId, id });
      
      axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moves, whiteToMove, inCheck: userId });

    }

    if (!_isKingInCheck && prevProps.inCheck === userId) {
      this.socket.emit('check', { userId: null, id });
      axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moves, whiteToMove, inCheck: null });
    }
  }

  componentWillUnmount() {

  }
  
  setText(e) {
    this.setState({ message: e.target.value });
  }

  sendChat() {
    const { message, messages } = this.state;
    const { id } = this.props;
    this.socket.emit('chat', { message, id } );
  }

  resign() {
    const { id, userId } =  this.props;
    const opponentId = userId === game.white ? game.black : game.white;
    this.socket.emit('game_over', { userId, id });
    axios.put(`http://localhost:3000/games/document`, { 
      id, 
      completed: true,
      winner: opponentId,
    });
  }

  offerDraw() {
    const { id, userId } =  this.props;
    this.socket.emit('draw', { userId, id })
  }

  render() {
    const { message, messages } = this.state;
    const { game } = this.props;
    return (
      game === null 
        ? null 
        : <div>
            GAME # {game.id}
            <Link to='/gamelist'>Back to gamelist</Link>
            <Board />
            <div className="chat-container">
              <div className="output">
                {messages.map((message, i) => <li key={i}>{message}</li> )}
              </div>
              <input type="text" placeholder="message" value={message} onChange={(e) => {this.setText(e)}} />
              <button onClick={() => {this.sendChat()}}>SEND</button>
            </div>
            <button onClick={() => {this.resign()}}>RESIGN</button>
            <button onClick={() => {this.offerDraw()}}>OFFER DRAW</button>
          </div>
    )
  }
}

const mapStateToProps = ({ userId, moves, game, currentPosition, whiteToMove, inCheck }) => {
  return { userId, moves, game, currentPosition, whiteToMove, inCheck }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ initGame, updatePosition, toggleTurn, updateCheckStatus, updateGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)

