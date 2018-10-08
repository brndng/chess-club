import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "./Modal.jsx";
import { declareGameOver } from "../actions/";

class Checkmate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      message: ""
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    const { socket, id, user, game, declareGameOver } = this.props;
    socket.on("checkmate", defeated => {
      if (user.id === defeated) {
        this.setState({ message: "You Lose!" }, () => this.showModal());
      } else {
        this.setState({ message: "You Win!" }, () => this.showModal());
      }
      declareGameOver("checkmate", game, defeated);
    });
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    const { showModal, message } = this.state;
    const { completed } = this.props;
    const modal = showModal && (
      <div>
        <Modal>
          <div className="modal">
            <div className="modal-btn-container">
              <button onClick={() => this.hideModal()}>╳</button>
            </div>
            <div className="modal-dialogue">
              <p> Checkmate! {message} </p>
              <div className="modal-dialogue-btn-container" />
            </div>
          </div>
        </Modal>
      </div>
    );

    return modal;
  }
}

const mapStateToProps = ({ user, game, completed }) => {
  return { user, game, completed };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ declareGameOver }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Checkmate);
