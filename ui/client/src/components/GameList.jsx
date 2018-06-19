import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import Game from './Game.jsx';
import { loadGames } from '../actions/';
import { formatDate } from '../../../../rules/utilities/';
import { whiteKnight, blackKnight } from '../../images/';

axios.defaults.withCredentials = true;

class GameList extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { loadGames, user } = this.props;
    const { id } = user;
    const games = await axios(`http://localhost:3000/games/all/${id}`)
    loadGames(games.data);
  }


  render() {
    const { userGames, game } = this.props;
    userGames.sort((a, b) => b.id - a.id);
    return (
      <div className="game-list">
        <div className="game-list-header">
          <p>CURRENT GAMES</p>
          <div className="content-header">
            <span className="match">MATCH</span>
            <span className="date">DATE CREATED</span>
          </div>
        </div>
        <br/>
        <div className="game-list-content">
          <ul>
            {userGames.map((game) => {
              return !game.completed && (
                <li key={game.id}>
                  <Link to={{ pathname: `/game/${game.id}` }}>
                    {game.whiteUsername} <small>{'vs'}</small> {game.blackUsername}
                  </Link>
                  <span><small>{formatDate(game.createdAt)}</small></span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, userGames, game }) => {
  return { user, userGames, game };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ loadGames }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GameList);
