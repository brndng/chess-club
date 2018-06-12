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
    this.acceptDraw = this.acceptDraw.bind(this);
    this.declineDraw = this.declineDraw.bind(this);
  }

  componentDidMount() {
    console.log('DRAW MOUNTING');
    if (this.props.socket) {
      const { socket, id, declareGameOver } = this.props;
      
      socket.on('draw_offer', (opponent) => {
        console.log('handler received draw_offer', opponent)
        this.showModal('offer');
      });
      socket.on('draw_accept', (response) => {
        console.log('handler received draw_accept', response)

        this.setState({
          isAccepted: true,
        });
        this.showModal('response');
        declareGameOver('draw');
      });
      socket.on('draw_decline', (response) => {
        console.log('handler received draw_decline', response)

        this.setState({
          isAccepted: false,
        });
        this.showModal('response');
      })
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

  async offerDraw() {
    const { id, user, socket } =  this.props;
    socket.emit('draw_offer', { userId: user.id, id });
    const offer = await axios.put(`http://localhost:3000/games/draw/offer`, { 
      id, 
      userId: user.id,
    });
  }

  acceptDraw() {
    const { user, id, socket, declareGameOver } = this.props;
    socket.emit('draw_accept', { userId: user.id, id });

    declareGameOver('draw');
    axios.put(`http://localhost:3000/games/draw/accept`, { 
      id, 
      user,
      completed: true,
      winner: null,
    });

    this.hideModal();
  }

  declineDraw() {
    const { user, id, socket } = this.props;
    socket.emit('draw_decline', { userId: user.id, id });

    axios.put(`http://localhost:3000/games/draw/offer`, { 
      id, 
      userId: null,
    });

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
                     <button className="btn" onClick={() => this.acceptDraw()}>ACCEPT</button>
                     <button className="btn" onClick={() => this.declineDraw()}>DECLINE</button>
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