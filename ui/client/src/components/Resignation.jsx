import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Modal from './Modal.jsx';
import { declareGameOver } from '../actions/';

axios.defaults.withCredentials = true;

class Resignation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      player: '',
      view: 'confirm',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.resign = this.resign.bind(this);
  }

  componentDidMount() {
    if (this.props.socket) {
      const { socket, id, declareGameOver } = this.props;
      socket.on('game_over', (player) => {
        this.setState({
          player,
          view: 'final',
        });
        this.showModal();
        declareGameOver();
      })
    }
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  }
  
  hideModal() {
    this.setState({
      showModal: false,
      view: 'confirm',
    });
  }

  resign() {
    const { id, user, game, socket } = this.props;
    const opponentId = user.id === game.white ? game.black : game.white;
    socket.emit('game_over', { userId: user.id, id });
    axios.put(`http://localhost:3000/games/document`, { 
      id, 
      completed: true,
      winner: opponentId,
    });
  }

  render() {
    const { completed } = this.props;
    const { showModal, view, player } = this.state;
    const onClick = completed
      ? null
      : () => this.showModal();
    const modal = showModal
      && <div >
           <Modal>
             <div className="modal"> {
               view === 'confirm'
                 ? <div className="modal-dialogue">
                     <p> Are you sure you want to resign? </p>
                     <button onClick={() => this.resign()}>YES</button>
                     <button onClick={() => this.hideModal()}>NO</button>
                   </div>
                 : <div className="modal-dialogue">
                     <p> {player} has resigned! </p>
                     <button onClick={() => this.hideModal()}>X</button>
                   </div>
             }
             </div>
           </Modal>
         </div>

    return (
      <div>         
        <button onClick={onClick}>RESIGN</button>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = ({ user, completed, game }) => {
  return { user, completed, game }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Resignation);