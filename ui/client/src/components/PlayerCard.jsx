import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { printCapturedPieces } from '../../rules/utilities';

// class User {
//   constructor(userId, game, whiteTomove) {
//     this.id = userId;
//     this.game = game;
//     this.whiteTomove = whiteTomove;
//   };

//   isMyTurn() {
//     return (this.id === this.game.white && this.whiteToMove);
//   }
// }

class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  async componentDidMount() {
    const { id } = this.props;
    const user = await axios.get(`http://localhost:3000/users/profile/${id}`);
    const { username } = user.data;
    console.log('username', username);
    this.setState({ username })
  }

  indicateTurn() {
    const { whiteToMove, game, id } = this.props;
    // TODO: user.isMyTurn()
    return (
      (id === game.white && whiteToMove) 
      || (id !== game.white && !whiteToMove)
    )
      ? 'is-my-turn'
      : null;
  }

  render() {
    const { id, game, moves } = this.props;
    const { username } = this.state;
    const capturedPieces = printCapturedPieces(id, game, moves);
    
    return (
      <div className={`player-card-container ${this.indicateTurn()}`}>
        <div className="player-card-username">
          {username}
        </div>
        <div className="player-card-pieces">
          {capturedPieces.map((piece, i) => (
            <div className="captured-piece" key={i}>
              {piece}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game, moves, whiteToMove }) => {
  return { game, moves, whiteToMove }
}

export default connect(mapStateToProps)(PlayerCard);