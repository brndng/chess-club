import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }

  componentDidMount() {
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
    const { id, user, socket } = this.props;
    socket.emit('chat', { message: { username: user.username, text: message }, id });
  }

  displayMoves() {
    this.setState({ view: 'moves' });
  }

  displayChat() {
    this.setState({ view: 'chat' });
  }

  render() {
    const { message, messages, view } = this.state;
    const currMoveIndex = this.props.moves.length - 1;
    
    return (
      <div className="game-display">
        <div className="game-display-toggle">
          <ul>
            <li><a href="#" className="toggle-moves" onClick={() => this.displayMoves()}>📜</a></li>
            <li><a href="#" className="toggle-chat" onClick={() => this.displayChat()}>💬</a></li>
          </ul>
        </div>{
          view === 'moves'
            ? <MoveHistory index={currMoveIndex} />
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

const mapStateToProps = ({ user, moves }) => {
  return { user, moves };
}

export default connect(mapStateToProps)(GameDisplay);


