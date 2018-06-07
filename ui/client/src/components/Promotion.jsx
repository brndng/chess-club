import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal.jsx';
import { updatePosition, updatePromotionStatus } from '../actions/';

const pieces = {
  n: '♞', 
  b: '♝', 
  r: '♜', 
  q: '♛', 
  N: '♘', 
  B: '♗', 
  R: '♖', 
  Q: '♕', 
}

class Promotion extends Component {
  constructor(props) {
    super(props);
    this.selectPiece = this.selectPiece.bind(this);
  }

  selectPiece(selection) {
    const { updatePosition, updatePromotionStatus, userId, game, promotingMove } = this.props;    
    const promotedTo = userId === game.white
      ? selection
      : selection.toLowerCase();
    
    updatePosition(...promotingMove, promotedTo);
    updatePromotionStatus();
    console.log('you have selected :', promotedTo)
  }

  render() {
    const { promotingMove } = this.props;
    const modal = promotingMove.length === 0
      ? null
      : <div >
          <Modal>
            <div className="modal">
              <p> Pawn has promoted !!! Select: </p>  
              <button onClick={() => {this.selectPiece('R')}}>{pieces['R']}</button> 
              <button onClick={() => {this.selectPiece('N')}}>{pieces['N']}</button> 
              <button onClick={() => {this.selectPiece('B')}}>{pieces['B']}</button> 
              <button onClick={() => {this.selectPiece('Q')}}>{pieces['Q']}</button> 
            </div>
          </Modal>
        </div>
    return modal;
  }
}

const mapStateToProps = ({ userId, game, promotingMove }) => {
  return { userId, game, promotingMove }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePosition, updatePromotionStatus }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Promotion);