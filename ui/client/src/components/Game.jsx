import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';
import updateMatrix from '../actions/action-update-matrix.js'; 

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      currMove: [],
    }
  }

  componentDidMount() {
    const { updateMatrix, gameId } = this.props;
    const { currMove, messages } = this.state;
    this.socket = io(`http://localhost:1337/`);
    this.socket.on('connect', () => this.socket.emit('gameId', gameId));
    this.socket.on('guestJoin', (data) => console.log(`someone has joined game room ${data}`))
    this.socket.on('chat', (message) => this.setState({ messages: [...messages, message], message: '' }))
    this.socket.on('newMove', (newMove) => {
      if (JSON.stringify(currMove) !== JSON.stringify(newMove)) {
        updateMatrix(...newMove);
        this.setState({ currMove: newMove})
      }
    });
  }

  componentDidUpdate() {
    const { moveList, gameId } = this.props;
    const { currMove } = this.state;
    const newMove = moveList.slice(-1)[0];

    if (newMove && JSON.stringify(newMove) !== JSON.stringify(currMove)) {
      this.socket.emit('newMove', { newMove, gameId });
      this.setState({ currMove: newMove });
    }
  }
  
  setText(e) {
    this.setState({ message: e.target.value });
  }

  sendChat() {
    const { message, messages } = this.state;
    const { gameId } = this.props;
    this.socket.emit('chat', { message, gameId } );
  }

  render() {
    const { message, messages } = this.state;
    return (
      <div>
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
    currentPosition: state.currentPosition,
    moveList: state.moveList,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateMatrix }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)

