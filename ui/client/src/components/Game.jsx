import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import Board from './Board.jsx';
import verifyLegalSquare from '../../rules/verify-legal-square.js';
import { isKingInCheck } from '../../rules/helpers';
import updatePosition from '../actions/action-update-position.js'; 
import toggleTurn from '../actions/action-toggle-turn.js';
import updateCheckStatus from '../actions/action-update-check-status.js';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      currMove: {},
    }
  }

  async componentDidMount() {
    const { id, updatePosition } = this.props;
    const { currMove } = this.state;
    this.socket = io(`http://localhost:1337/`);
    this.socket.on('connect', () => this.socket.emit('gameId', id));
    this.socket.on('guestJoin', (data) => console.log(`someone has joined game room ${data}`))
    this.socket.on('chat', (message) => {this.setState({ messages: [...this.state.messages, message], message: '' })})
    this.socket.on('newMove', (newMove) => {
      if (JSON.stringify(currMove) !== JSON.stringify(newMove)) {
        // const { origin, destination, pieceToMove } = newMove;
        // updatePosition(origin, destination, pieceToMove) ;
        updatePosition(...newMove);
        this.setState({ currMove: newMove })
      }
    });
  }

  componentDidUpdate(prevProps) {
    
    const { id, userId, currentPosition, moves, whiteToMove, toggleTurn, game, updateCheckStatus } = this.props;
    const { currMove } = this.state;
    const newMove = moves.slice(-1)[0];
    // console.log('prevProps.id,id',prevProps.id,id)
    console.log('whiteToMove:', whiteToMove)

    if (newMove && JSON.stringify(newMove) !== JSON.stringify(currMove) && prevProps.id === id) {
      //TODO: executes on switch game, unwanted toggle turn 
      this.socket.emit('newMove', { newMove, id });
      // const saved = await axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moves, whiteToMove });
      axios.put(`http://localhost:3000/games/update`, { id, currentPosition, moves, whiteToMove });

      // console.log('saved data back from DB:', saved.data.moves)
      toggleTurn();
      this.setState({ currMove: newMove });
    }
    if (isKingInCheck(userId, game.white, currentPosition)) {
      console.log('youre in CHECK SON!!!')
      // updateCheckStatus(userId);
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const newMove = [...nextProps.moves.slice(-1)];
  //   const currMove = [...this.props.moves.slice(-1)];

  //   console.log('currMove, newMove', this.props.moves, nextProps.moves)
  
  //   return JSON.stringify(newMove) !== JSON.stringify(currMove);
    

  //   // if (this.props.moves.length !== nextProps.moves.length) {
  //   //   console.log('DIFFERENT PROPS')
  //   // }

  //   // return nextProps.moves.length !== this.props.moves.length || nextProps.whiteToMove !== this.props.whiteToMove;
  //   // return JSON.stringify(this.props.moves) !== JSON.stringify(nextProps.moves);
  //   // const { moves } = this.props;
  //   // const { currMove } = this.state;    
  //   // const newMove = moves.slice(-1)[0];

  //   // if (!(newMove && JSON.stringify(newMove) !== JSON.stringify(currMove)))  {
  //   //   return false;
  //   // }

  //   return true;
  // }
  
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

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    moves: state.moves,
    game: state.game,
    currentPosition: state.currentPosition,
    whiteToMove: state.whiteToMove
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePosition, toggleTurn, updateCheckStatus }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game)

