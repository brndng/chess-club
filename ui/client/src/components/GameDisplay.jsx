import React, { Component } from 'react';
import axios from 'axios';
import MoveHistory from './MoveHistory.jsx';
import Chat from './Chat.jsx';

class GameDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      view: 'moves', 
    }
    this.setText = this.setText.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    if (this.props.socket) {
      this.props.socket.on('chat', (message) => {
        this.setState({ 
          messages: [...this.state.messages, message], 
          message: '',
        });
      });
    }
  }

  setText(e) {
    this.setState({ message: e.target.value });
  }

  sendChat() {
    const { message } = this.state;
    const { id, socket } = this.props;
    socket.emit('chat', { message, id });
  }

  setView(view) {
    this.setState({ view });
  }

  displayMoves() {
    this.setState({ view: 'moves' });
  }

  displayChat() {
    this.setState({ view: 'chat' });
  }

  render() {
    const { message, messages, view } = this.state;
    return (
      <div className="game-display">
        <div className="game-display-toggle">
          <ul>
            <li><a href="#" onClick={this.displayMoves}>Moves</a></li>
            <li><a href="#" onClick={this.displayChat}>Chat</a></li>
          </ul>
        </div>
        {view === 'moves'
          ? <MoveHistory />
          : <Chat 
              message={message}
              messages={messages}
              setText={this.setText} 
              sendChat={this.sendChat} 
            />
        }
      </div>
    );
  }
}

export default GameDisplay;


