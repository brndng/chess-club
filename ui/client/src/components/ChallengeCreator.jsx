import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal.jsx';
import { genRandomColor } from '../../../../rules/utilities';

axios.defaults.withCredentials = true;

class ChallengeCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      gameId: null,
      black: null,
      white: null,
      whiteUsername: '',
      blackUsername: '',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  }
  
  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  redirectToGame(id) {
    const { history } = this.props;
    history.push(`/game/${id}`);
  }

  setMatchup(color) {
    const { user, opponent, whiteUsername, blackUsername } = this.props;
    if (color === 'white') {
      this.setState({ 
        white: user.id, 
        black: opponent.id,
        whiteUsername: user.username,
        blackUsername: opponent.username,
      });
    } else {
      this.setState({ 
        white: opponent.id, 
        black: user.id, 
        whiteUsername: opponent.username,
        blackUsername: user.username,
      });
    }
  }

  async createGame() {
    const { white, black, whiteUsername, blackUsername } = this.state;
    const newGame = await axios.post(`${process.env.PATH}:${process.env.PORT}/games/challenge`, { 
      white, 
      black,
      whiteUsername,
      blackUsername,
    });
    if (newGame) {
      this.setState({
        gameId: newGame.data.id,
      }, () => this.showModal());
    }
  }

  render() {
    const { showModal, gameId, white, black } = this.state;
    const { opponent, selectedPlayer } = this.props;
    const random = genRandomColor();
    const isDisabled = !(white !== null && black !== null);
    const selectedOpponent = opponent
      ? opponent.username
      : 'Please select an opponent';
    const modal = showModal
      && <div >
           <Modal>
             <div className="modal"> 
               <div className="modal-btn-container">
                 <button onClick={() => this.hideModal()}>╳</button> 
               </div>
               <div className="modal-dialogue">
                 <p> New game created! Go to game: </p>
                 <div className="modal-dialogue-btn-container">
                   <button onClick={() => this.redirectToGame(gameId)}>➤</button>
                 </div>
               </div>
             </div>
           </Modal>
         </div>;
    
    return (
      <div className="challenge-creator">  
        <div className="challenge-creator-header"><p>▧ NEW GAME</p></div>
        <div className="challenge-creator-content">
          <div><span>{`OPPONENT: `}</span><span><strong>{selectedOpponent}</strong></span></div>
          <div className="slct-container">
            <span>{`I PLAY AS: `}</span>
            <select className="slct" onChange={(e) => this.setMatchup(e.target.value)} disabled={opponent === null}>
              <option value={null} defaultValue>SELECT COLOR</option>
              <option value="white">♔  WHITE</option>
              <option value="black">♚  BLACK</option>
              <option value={random}>�  RANDOM</option>
            </select>
          </div>
          
        </div>
        <div className="challenge-button">
          <button onClick={() => this.createGame()} disabled={isDisabled}>CHALLENGE</button>
        </div>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = ({ user, opponent }) => {
  return { user, opponent };
}

export default withRouter(connect(mapStateToProps)(ChallengeCreator));