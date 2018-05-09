import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';

import updateMatrix from '../actions/action-update-matrix.js'; 
import initGame from '../actions/action-init-game.js';
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
    const { id, white, black, position, updateMatrix, initGame, gameState, toggleTurn } = this.props;
    const { currMove } = this.state;
    this.socket = io(`http://localhost:1337/`);
    this.socket.on('connect', () => this.socket.emit('gameId', id));
    this.socket.on('guestJoin', (data) => console.log(`someone has joined game room ${data}`))
    this.socket.on('chat', (message) => this.setState({ messages: [...this.state.messages, message], message: '' }))
    this.socket.on('newMove', (newMove) => {
      if (JSON.stringify(currMove) !== JSON.stringify(newMove)) {
        updateMatrix(...newMove);
        this.setState({ currMove: newMove})
      }
    });
  }

  componentDidUpdate() {
    const { id, currentPosition, moveList, toggleTurn } = this.props;
    const { currMove } = this.state;
    const newMove = moveList.slice(-1)[0];



    if (newMove && JSON.stringify(newMove) !== JSON.stringify(currMove)) {
      this.socket.emit('newMove', { newMove, id });
      toggleTurn();
      this.setState({ currMove: newMove });
    }

    // axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moveList, whiteToMove } )

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
    console.log('rendering game')
    const { message, messages } = this.state;
    const { position } = this.props;
    return (
      <div>
        GAME # {this.props.id}
        <Board position={position}/>
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
    currentPosition: state.currentPosition,
    moveList: state.moveList,
    gameState: state.gameState,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateMatrix, initGame, toggleTurn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)

