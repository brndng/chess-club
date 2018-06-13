import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal.jsx';
import { updatePosition, loadPromotingMove } from '../actions/';
import { convertToChessNotation } from '../../../../rules/utilities/'
import { willMoveGiveCheck } from '../../../../rules/interactions/';

class Promotion extends Component {
  constructor(props) {
    super(props);
    this.selectPiece = this.selectPiece.bind(this);
  }

  selectPiece(p) {
    const { updatePosition, loadPromotingMove, user, game, promotingMove, currentPosition, moves, selection } = this.props;   
    const [origin, destin, piece, captured] = promotingMove;
    const promotedTo = user.id === game.white
      ? p
      : p.toLowerCase();
      const _check = willMoveGiveCheck(user.id, game.white, selection, destin, currentPosition, moves, promotedTo);
      const _notation = convertToChessNotation(selection.origin, destin, selection.piece, piece, _check, promotedTo);
    
    updatePosition(selection.origin, destin, selection.piece, captured, _notation, promotedTo, moves);
    loadPromotingMove();
  }

  render() {
    const { promotingMove } = this.props;
    const modal = promotingMove.length === 0
      ? null
      : <div >
          <Modal>
            <div className="modal">
              <div className="modal-btn-container"></div>
              <div className="modal-dialogue">
                <p> Pawn has promoted !!! Select: </p>  
                <div className="modal-dialogue-btn-container">
                  <button onClick={() => {this.selectPiece('R')}}>{pieces['R']}</button> 
                  <button onClick={() => {this.selectPiece('N')}}>{pieces['N']}</button> 
                  <button onClick={() => {this.selectPiece('B')}}>{pieces['B']}</button> 
                  <button onClick={() => {this.selectPiece('Q')}}>{pieces['Q']}</button> 
                </div>
              </div>
            </div>
          </Modal>
        </div>
    return modal;
  }
}

const mapStateToProps = ({ user, game, promotingMove, currentPosition, moves, selection }) => {
  return { user, game, promotingMove, currentPosition, moves, selection }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePosition, loadPromotingMove }, dispatch);
}

var pieces = {
  n: '♞', 
  b: '♝', 
  r: '♜', 
  q: '♛', 
  N: '♘', 
  B: '♗', 
  R: '♖', 
  Q: '♕', 
}

export default connect(mapStateToProps, matchDispatchToProps)(Promotion);