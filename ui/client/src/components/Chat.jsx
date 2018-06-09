import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

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
        <div className="chat-message">
          <input type="text" placeholder="message" value={message} onChange={(e) => {setText(e)}} />
          <button onClick={() => {sendChat()}}>SEND</button>
        </div>
      </div>
    );
  }
}

export default Chat;