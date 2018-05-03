import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client/dist/socket.io.js';
import Board from './Board.jsx';
import updateMatrix from '../actions/action-update-matrix.js'; 

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
    }
  }

  // componentDidMount() {
  // eventually don't want to form a new socket connection on every update
  // }

  componentDidMount() {
    const { gameId } = this.props;
    this.socket = io(`http://localhost:1337/`);
    this.socket.on('connect', () => this.socket.emit('gameId', gameId));
    this.socket.on('guestJoin', (data) => console.log(`someone has joined game room ${data}`))
    this.socket.on('chat', (message) => this.setState({ messages: [...this.state.messages, message], message: '' }))
    // this.socket.on('currentPosition')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentPosition, gameId } = this.props;
    console.log('currentPosition from game', currentPosition)
    this.socket.emit('currentPosition:', { currentPosition, gameId });
    //im going to receive the current position from store on re render
    //so send that to socket server and broadcast
    //or recent coordinates?
  }
  
  setText(e) {
    this.setState({ message: e.target.value });

  }
  sendChat() {
    const { message, messages } = this.state;
    const { gameId } = this.props;
    this.socket.emit('chat', { message, gameId } );
    // this.setState({ messages: [...messages, message], message: '', });
  }

  render() {
    console.log('rerenders', this.props.currentPosition)
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
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateMatrix }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)

