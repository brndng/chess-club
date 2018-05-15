import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Game from './Game.jsx';
import loadGames from '../actions/action-load-games.js';
import initGame from '../actions/action-init-game.js';

class GameList extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { loadGames, userId } = this.props;
    const games = await axios(`http://localhost:3000/games/all/${userId}`)
    loadGames(games.data);
  }

  async loadGameState(id) {
    const { initGame } = this.props;
    const game = await axios.get(`http://localhost:3000/games/${id}`);
    const { white, black, position, whiteToMove, moves } = game.data;
    initGame(id, white, black, position, whiteToMove, moves);
  }

  render() {
    const { userGames, game } = this.props;
    return (
      <div>
        {userGames.map((game) => {
          return <li key={game.id}><a href="#" onClick={()=>this.loadGameState(game.id)}>{`GAME # ${game.id}`}</a></li>
        })}
        <br/>
        {game === null ? null : <Game id={game.id}/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGames: state.userGames,
    game: state.game,
    userId: state.userId,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ loadGames, initGame }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GameList)