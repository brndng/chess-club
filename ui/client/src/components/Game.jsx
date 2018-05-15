import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { isKingInCheck } from '../../rules/utilities';
import { updatePosition, toggleTurn, updateCheckStatus } from '../actions/';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
    }
  }

  async componentDidMount() {
    const { id, updatePosition } = this.props;
    this.socket = io(`http://localhost:1337/`);
    this.socket.on('connect', () => this.socket.emit('gameId', id));
    this.socket.on('guestJoin', (data) => console.log(`someone has joined game room ${data}`))
    this.socket.on('chat', (message) => {this.setState({ messages: [...this.state.messages, message], message: '' })})
    this.socket.on('newMove', (newMove) => {
      let currMove = this.props.moves.slice(-1)[0];
      if (JSON.stringify(currMove) !== JSON.stringify(newMove)) {
        updatePosition(...newMove);
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { id, userId, currentPosition, moves, whiteToMove, toggleTurn, game, updateCheckStatus } = this.props;
    const currMove= prevProps.moves.slice(-1)[0];
    const newMove = moves.slice(-1)[0];

    if (newMove && JSON.stringify(newMove) !== JSON.stringify(currMove) && prevProps.id === id) {
      this.socket.emit('newMove', { newMove, id });
      axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moves, whiteToMove });
      toggleTurn();
    }
    if (isKingInCheck(userId, game.white, currentPosition)) {
      console.log('youre in CHECK SON!!!')
      // updateCheckStatus(userId);
    };
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
    const { game } = this.props;
    return (
      game === null? null :
        <div>
          GAME # {game.id}
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

const mapStateToProps = ({ userId, moves, game, currentPosition, whiteToMove }) => {
  return { userId, moves, game, currentPosition, whiteToMove }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePosition, toggleTurn, updateCheckStatus }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)

