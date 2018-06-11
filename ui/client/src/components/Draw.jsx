import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Modal from './Modal.jsx';
import { declareGameOver } from '../actions/';

axios.defaults.withCredentials = true;

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'offer',
      showModal: false,
      isAccepted: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.offerDraw = this.offerDraw.bind(this);
    this.sendResponse = this.sendResponse.bind(this);
  }

  componentDidMount() {
    if (this.props.socket) {
      const { socket, id, declareGameOver } = this.props;
      
      socket.on('draw_offer', (opponent) => {
        this.showModal('offer');
      });
      socket.on('draw_response', (response) => {
        const { isAccepted } = response;
        this.setState({
          isAccepted,
        });
        this.showModal('response');
        if (isAccepted) {
          declareGameOver('draw');
        }
      });
    }
  }

  showModal(view) {
    this.setState({
      showModal: true,
      view,
    });
  }
  
  hideModal() {
    this.setState({
      showModal: false,
      view: 'offer'
    });
  }

  offerDraw() {
    const { id, user, socket } =  this.props;
    socket.emit('draw_offer', { userId: user.id, id })
    axios.put(`http://localhost:3000/games/draw/offer`, { 
      id, 
      user,
    });
  }
  
  sendResponse(isAccepted) {
    const { user, id, socket, declareGameOver } = this.props;
    socket.emit('draw_response', { userId: user.id, id, isAccepted });
    if (isAccepted) {
      declareGameOver('draw');
      axios.put(`http://localhost:3000/games/draw/accept`, { 
        id, 
        user,
        completed: true,
        winner: null,
      });
    }
    this.hideModal();
  }

  render() {
    const { completed, opponent } = this.props;
    const { showModal, view, isAccepted } = this.state;
    const onClick = completed 
      ? null
      : () => this.offerDraw();
    const response = isAccepted
      ? 'accepted'
      : 'declined'
    const modal = showModal
      && <div >
           <Modal>
             <div className="modal"> 
             <button className="btn-x" onClick={this.hideModal}>X</button>

             {
               view === 'offer'
                 ? <div className="modal-dialogue">
                     <p> {opponent.username} has offered a draw </p>
                     <button className="btn" onClick={() => this.sendResponse(true)}>ACCEPT</button>
                     <button className="btn" onClick={() => this.sendResponse(false)}>DECLINE</button>
                   </div>
                 : <div className="modal-dialogue">
                     <p> {opponent.username} has {response} your draw offer </p>
                   </div>
             }
             </div>
           </Modal>
         </div>

    return (
      <div>         
        <button onClick={onClick}>OFFER DRAW</button>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = ({ user, opponent, completed }) => {
  return { user, opponent, completed }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Draw);