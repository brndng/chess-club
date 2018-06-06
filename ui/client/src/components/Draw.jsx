import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal.jsx';
import { declareGameOver, authenticate } from '../actions/';

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      opponent: '',
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.acceptDraw = this.acceptDraw.bind(this);
  }

  componentDidMount() {
    if (this.props.socket) {
      const { socket } = this.props;
      
      socket.on('draw_offer', (player) => {
        this.setState({
          opponent: player,
        });
        this.handleShow();
      });

      socket.on('draw_accepted', (player) => {
        console.log(`${player} has agreed to a draw.`)
        declareGameOver();
      })
    }

    

    // this.socket.on('draw_offer', (player) => {
    //   declareGameOver();
    //   if (userId !== player) {
    //     console.log(`Player ${player} has offered a draw`);
    //   }
    // });
  }

  handleShow() {
    this.setState({showModal: true});
  }
  
  handleHide() {
    this.setState({showModal: false});
  }
  
  acceptDraw() {
    const { userId, id, declareGameOver } = this.props;
    this.props.socket.emit('draw_accepted', { userId, id });
    this.handleHide();
  }

  render() {
    const { showModal, opponent } = this.state;
    const modal = showModal
      ? <div >
          <Modal>
            <div className="modal">
              <p> {opponent} has offered a draw </p>
              <button onClick={this.acceptDraw}>ACCEPT</button>
              <button onClick={this.handleHide}>DECLINE</button>
            </div>
          </Modal>
        </div>
      : null;

    return modal;
  }
}

const mapStateToProps = ({ userId }) => {
  return { userId }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ declareGameOver }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Draw);