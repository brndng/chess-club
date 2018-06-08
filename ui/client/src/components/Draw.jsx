import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal.jsx';
import { declareGameOver } from '../actions/';

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      opponent: '',
      view: 'offer',
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
        this.setState({
          opponent,
        });
        this.showModal('offer');
      });
      socket.on('draw_response', (response) => {
        const { isAccepted } = response;
        this.setState({
          isAccepted,
        });
        this.showModal('response');
        if (isAccepted) {
          declareGameOver();
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
    const { id, userId, socket } =  this.props;
    socket.emit('draw_offer', { userId, id })
  }
  
  sendResponse(isAccepted) {
    const { userId, id, socket, declareGameOver } = this.props;
    socket.emit('draw_response', { userId, id, isAccepted });
    if (isAccepted) {
      declareGameOver();
    }
    this.hideModal();
  }

  render() {
    const { completed } = this.props;
    const { showModal, opponent, view, isAccepted } = this.state;
    const onClick = completed 
      ? null
      : () => this.offerDraw();
    const response = isAccepted
      ? 'accepted'
      : 'declined'
    const modal = showModal
      && <div >
           <Modal>
            <div className="modal"> {
              view === 'offer'
                ? <div className="modal-dialogue">
                    <p> {opponent} has offered a draw </p>
                    <button onClick={() => this.sendResponse(true)}>ACCEPT</button>
                    <button onClick={() => this.sendResponse(false)}>DECLINE</button>
                  </div>
                : <div className="modal-dialogue">
                    <p> {opponent} has {response} your draw offer </p>
                    <button onClick={this.hideModal}>X</button>
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

const mapStateToProps = ({ userId, completed }) => {
  return { userId, completed }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Draw);