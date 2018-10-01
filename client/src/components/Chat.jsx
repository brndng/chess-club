import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, messages, setText, sendChat } = this.props;
    return (
      <div className="chat-container">
        <div className="chat-output">
          {messages.map((message, i) => <li key={i}><strong>{message.username}</strong>{`: ${message.text}`}</li>)}
        </div>
        <div className="chat-message">
          <form onSubmit={(e) => { sendChat(e) }}>
            <input type="text" placeholder="message" value={message} onChange={(e) => { setText(e) }} />
            <button type="submit">➤</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
