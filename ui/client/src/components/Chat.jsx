import React, { Component } from 'react';
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
    }
  }

  componentDidMount() {
    console.log('CDM CHAT SOCKET', this.props.socket)
    this.props.socket.on('chat', (message) => {
      this.setState({ 
        messages: [...this.state.messages, message], 
        message: '',
      });
    });
  }

  setText(e) {
    this.setState({ message: e.target.value });
  }

  sendChat() {
    const { message } = this.state;
    const { id } = this.props;
    this.props.socket.emit('chat', { message, id });
  }

  render() {
    const { message, messages } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-output">
          {messages.map((message, i) => <li key={i}>{message}</li>)}
        </div>
        <input type="text" placeholder="message" value={message} onChange={(e) => {this.setText(e)}} />
        <button onClick={() => {this.sendChat()}}>SEND</button>
      </div>
    );
  }
}

export default Chat;