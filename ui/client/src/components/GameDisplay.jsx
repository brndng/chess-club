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
      showMoves: true,
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

  displayMoves(e) {

    if (!e.target.value) {
      this.setState({ showMoves: true })
    }
    this.setState({ view: 'moves' });

  }

  displayChat(e) {
    if (!e.target.value) {
      this.setState({ showMoves: false })
    }
    this.setState({ view: 'chat' });
  }

  render() {
    const { message, messages, view, showMoves } = this.state;
    const currMoveIndex = this.props.moves.length - 1;
    const movesBackground = showMoves ? 'light-bkgrd' : 'dark-bkgrd';
    const chatBackground = showMoves ? 'dark-bkgrd' : 'light-bkgrd';
    
    return (
      <div className="game-display">
        <div className="game-display-toggle">
          <ul>
            <li className={`toggle-moves ${movesBackground}`}>
              <a href="#" value={showMoves} onClick={(e) => {this.displayMoves(e)}}>📜 <span>MOVES</span></a>
            </li>
            <li className={`toggle-chat ${chatBackground}`}>
              <a href="#" value={!showMoves}  onClick={(e) => {this.displayChat(e)}} >🗨️ <span>CHAT </span></a></li>
          </ul>
        </div>
          {view === 'moves'
            ? <MoveHistory index={currMoveIndex} />
            : <Chat 
                message={message}
                messages={messages}
                setText={this.setText} 
                sendChat={this.sendChat} 
              />}
        </div>
    );
  }
}

const mapStateToProps = ({ user, moves }) => {
  return { user, moves };
}

export default connect(mapStateToProps)(GameDisplay);


