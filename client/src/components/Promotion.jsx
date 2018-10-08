import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "./Modal.jsx";
import { selectPiece, updatePosition, loadPromotingMove } from "../actions/";
import { convertToChessNotation, figurines } from "../../../rules/utilities";
import { willMoveGiveCheck } from "../../../rules/interactions/";

class Promotion extends Component {
  constructor(props) {
    super(props);
    this.selectPiece = this.selectPiece.bind(this);
  }

  selectPiece(p) {
    const {
      selectPiece,
      updatePosition,
      loadPromotingMove,
      user,
      game,
      promotingMove,
      currentPosition,
      moves,
      selection,
      squares
    } = this.props;
    const [origin, destin, piece, captured] = promotingMove;
    const promotedTo = user.id === game.white ? p : p.toLowerCase();
    const _check = willMoveGiveCheck(
      user.id,
      game.white,
      selection,
      destin,
      currentPosition,
      moves,
      squares,
      promotedTo
    );
    const _notation = convertToChessNotation(
      selection.origin,
      destin,
      selection.piece,
      piece,
      _check,
      promotedTo
    );

    updatePosition(
      selection.origin,
      destin,
      selection.piece,
      captured,
      _notation,
      promotedTo,
      currentPosition,
      moves
    );
    loadPromotingMove();
  }

  render() {
    const { promotingMove } = this.props;
    const modal =
      promotingMove.length === 0 ? null : (
        <div>
          <Modal>
            <div className="modal">
              <div className="modal-btn-container" />
              <div className="modal-dialogue">
                <p> Pawn has promoted! Select: </p>
                <div className="modal-dialogue-btn-container">
                  <button
                    onClick={() => {
                      this.selectPiece("R");
                    }}
                  >
                    {figurines["R"].symbol}
                  </button>
                  <button
                    onClick={() => {
                      this.selectPiece("N");
                    }}
                  >
                    {figurines["N"].symbol}
                  </button>
                  <button
                    onClick={() => {
                      this.selectPiece("B");
                    }}
                  >
                    {figurines["B"].symbol}
                  </button>
                  <button
                    onClick={() => {
                      this.selectPiece("Q");
                    }}
                  >
                    {figurines["Q"].symbol}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      );
    return modal;
  }
}

const mapStateToProps = ({
  user,
  game,
  promotingMove,
  currentPosition,
  moves,
  selection,
  squares
}) => {
  return {
    user,
    game,
    promotingMove,
    currentPosition,
    moves,
    selection,
    squares
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    { selectPiece, updatePosition, loadPromotingMove },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Promotion);
