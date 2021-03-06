import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import adapter from "../adapter";
import Modal from "./Modal.jsx";
import { declareGameOver } from "../actions/";

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "offer",
      showModal: false,
      isAccepted: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.offerDraw = this.offerDraw.bind(this);
    this.acceptDraw = this.acceptDraw.bind(this);
    this.declineDraw = this.declineDraw.bind(this);
  }

  componentDidMount() {
    const { socket, id, declareGameOver } = this.props;

    socket.on("draw_offer", opponent => {
      this.showModal("offer");
    });
    socket.on("draw_accept", response => {
      this.setState({
        isAccepted: true
      });
      this.showModal("response");
      declareGameOver("draw");
    });
    socket.on("draw_decline", response => {
      this.setState({
        isAccepted: false
      });
      this.showModal("response");
    });
  }

  showModal(view) {
    this.setState({
      showModal: true,
      view
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
      view: "offer"
    });
  }

  async offerDraw() {
    const { id, user, socket } = this.props;
    const offer = await adapter.put(`/games/draw/offer`, {
      id,
      userId: user.id
    });
    if (offer.status === 200) {
      socket.emit("draw_offer", { id, userId: user.id });
    }
  }

  async acceptDraw() {
    const { user, id, socket, declareGameOver } = this.props;
    const response = await adapter.put(`/games/draw/accept`, {
      id,
      completed: true,
      winner: null
    });

    if (response.status === 200) {
      socket.emit("draw_accept", { id, userId: user.id });
      declareGameOver("draw");
    }
    this.hideModal();
  }

  async declineDraw() {
    const { user, id, socket } = this.props;
    const response = await adapter.put(`/games/draw/offer`, {
      id,
      userId: user.id
    });

    if (response.status === 200) {
      socket.emit("draw_decline", { id, userId: null });
    }
    this.hideModal();
  }

  render() {
    const { completed, opponent } = this.props;
    const { showModal, view, isAccepted } = this.state;
    const response = isAccepted ? "accepted" : "declined";
    const modal = showModal && (
      <div>
        <Modal>
          <div className="modal">
            <div className="modal-btn-container">
              {view !== "offer" && (
                <button onClick={() => this.hideModal()}>╳</button>
              )}
            </div>
            {view === "offer" ? (
              <div className="modal-dialogue">
                <p>{`${opponent.username} offered a draw`}</p>
                <div className="modal-dialogue-btn-container">
                  <button onClick={() => this.acceptDraw()}>ACCEPT</button>
                  <button onClick={() => this.declineDraw()}>DECLINE</button>
                </div>
              </div>
            ) : (
              <div className="modal-dialogue">
                <p>{`${opponent.username} ${response} your draw offer`}</p>
                <div className="modal-dialogue-btn-container" />
              </div>
            )}
          </div>
        </Modal>
      </div>
    );

    return (
      <div>
        <button onClick={() => this.offerDraw()}>DRAW</button>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = ({ user, opponent, completed }) => {
  return { user, opponent, completed };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ declareGameOver }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Draw);
