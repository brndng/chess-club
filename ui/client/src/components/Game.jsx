import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { findKingSquare, inCheck } from '../../rules/helpers';
import updateMatrix from '../actions/action-update-matrix.js'; 
import toggleTurn from '../actions/action-toggle-turn.js';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      currMove: [],
    }
  }

  async componentDidMount() {
    const { id, updateMatrix } = this.props;
    const { currMove } = this.state;
    this.socket = io(`http://localhost:1337/`);
    this.socket.on('connect', () => this.socket.emit('gameId', id));
    this.socket.on('guestJoin', (data) => console.log(`someone has joined game room ${data}`))
    this.socket.on('chat', (message) => {this.setState({ messages: [...this.state.messages, message], message: '' })})
    this.socket.on('newMove', (newMove) => {
      if (JSON.stringify(currMove) !== JSON.stringify(newMove)) {
        updateMatrix(...newMove);
        this.setState({ currMove: newMove})
      }
    });
  }

  componentDidUpdate() {
    const { id, currentPosition, moveList, whiteToMove, toggleTurn, gameSnapshot, userId  } = this.props;
    const { currMove } = this.state;
    const newMove = moveList.slice(-1)[0];
    console.log('whiteToMove:', whiteToMove)

    if (newMove && JSON.stringify(newMove) !== JSON.stringify(currMove)) {
      this.socket.emit('newMove', { newMove, id });
      axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moveList, whiteToMove });
      toggleTurn();
      this.setState({ currMove: newMove });
    }
    this.isKingInCheck()
  }

  isKingInCheck() {
    const { userId, gameSnapshot, currentPosition } = this.props;
    const { white } = gameSnapshot;
    
    if(userId === white) { 
      let kingSquare = findKingSquare('K', currentPosition)
      let params = [kingSquare, currentPosition, 'white', verifyLegalSquare]
      console.log(`User ${userId}, inCheck:`, inCheck(...params))
    } else {
      let kingSquare = findKingSquare('k', currentPosition)
      let params = [kingSquare, currentPosition, 'black', verifyLegalSquare]
      console.log(`User ${userId}, inCheck:`, inCheck(...params))
    }
  }
  
  setText(e) {
    this.setState({ message: e.target.value });
  }

  sendChat() {
    const { message, messages } = this.state;
    const { id } = this.props;
    this.socket.emit('chat', { message, id } );
  }

  render() {
    const { message, messages } = this.state;
    const { gameSnapshot } = this.props;
    return (
      gameSnapshot === null? null :
        <div>
          GAME # {gameSnapshot.id}
          <Board />
          <div className="chat-container">
            <div className="output">
              {messages.map((message, i) => <li key={i}>{message}</li> )}
            </div>
            <input type="text" placeholder="message" value={message} onChange={(e) => {this.setText(e)}} />
            <button onClick={() => {this.sendChat()}}>SEND</button>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    moveList: state.moveList,
    gameSnapshot: state.gameSnapshot,
    currentPosition: state.currentPosition,
    whiteToMove: state.whiteToMove
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateMatrix, toggleTurn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)

