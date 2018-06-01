import React, { Component } from 'react';
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, messages, setText, sendChat } = this.props;
    return (
      <div className="chat-container">
        <div className="chat-output">
          {messages.map((message, i) => <li key={i}>{message}</li>)}
        </div>
        <input type="text" placeholder="message" value={message} onChange={(e) => {setText(e)}} />
        <button onClick={() => {sendChat()}}>SEND</button>
      </div>
    );
  }
}

export default Chat;