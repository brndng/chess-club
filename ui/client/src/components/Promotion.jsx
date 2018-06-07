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
    
    // this.handleHide = this.handleHide.bind(this);
    this.selectPiece = this.selectPiece.bind(this);
  }
  
  // handleHide() {
  //   const { updatePromotionStatus } = this.props;
  //   updatePromotionStatus();
  // }

  selectPiece(promotedTo) {
    const { updatePosition, updatePromotionStatus, promotionMove } = this.props;
    const selection = pieces[promotedTo];
    updatePosition(...promotionMove, promotedTo)
    updatePromotionStatus();
    console.log('you have selected :', selection)
  }

  render() {
    const { promotionMove } = this.props;
    const modal = promotionMove.length === 0
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

const mapStateToProps = ({ userId, promotionMove }) => {
  return { userId, promotionMove }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePosition, updatePromotionStatus }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Promotion);