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
    const { socket, id, declareGameOver, game } = this.props;
    socket.on('resign', (player) => {
      this.setState({
        player,
        view: 'final',
      }, () => {
        this.showModal();
        declareGameOver('resign', game, player.id);
      });
    })
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

  async resign() {
    const { id, user, game, socket, result } = this.props;
    const opponentId = user.id === game.white ? game.black : game.white;
    const resignation = await axios.put(`http://localhost:3000/games/resign`, { 
      id, 
      user,
      completed: true,
      winner: opponentId,
      result,
    });
    if (resignation.status === 200) {
      socket.emit('resign', { id, user });
    }
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
             <div className="modal"> 
               <div className="modal-btn-container">
                {view !== 'confirm' && <button onClick={() => this.hideModal()}>╳</button>}
               </div> 
             {
               view === 'confirm'
                 ? <div className="modal-dialogue">
                     <p> Are you sure you want to resign? </p>
                     <div className="modal-dialogue-btn-container">
                       <button onClick={() => this.resign()}>YES</button>
                       <button onClick={() => this.hideModal()}>NO</button>
                     </div>
                   </div>
                 : <div className="modal-dialogue">
                     <p> {player.username} has resigned! </p>
                     <div className="modal-dialogue-btn-container"></div>
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

const mapStateToProps = ({ user, completed, game, result }) => {
  return { user, completed, game, result }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Resignation);