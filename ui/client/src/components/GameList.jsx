import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import Game from './Game.jsx';
import { loadGames, initGame } from '../actions/';
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


  // render() {
  //   const { userGames, game } = this.props;
  //   return (
  //     <div>
  //       IN PROGRESS
  //       {userGames.map((game) => {
  //         if (!game.completed) {
  //           return <li key={game.id}><a href="#" onClick={()=>this.loadGameState(game.id)}>{`GAME # ${game.id}`}</a></li>
  //         }
  //       })}
  //       <br/>
  //       COMPLETED
  //       {userGames.map((game) => {
  //         if (game.completed) {
  //           return <li key={game.id}><a href="#" onClick={()=>this.loadGameState(game.id)}>{`GAME # ${game.id}`}</a></li>
  //         }
  //       })}
  //       <br/>
  //       {game === null ? null : <Game id={game.id}/>}
  //     </div>
  //   )
  // }

  render() {
    const { userGames, game } = this.props;
    userGames.sort((a, b) => b.id - a.id);
    return (
      <div className="game-list">
        <div className="game-list-header">
          <div><img src={whiteKnight} className="image-knight white"/></div>
          <p>CURRENT GAMES</p>

          <div><img src={blackKnight} className="image-knight black"/></div>
        </div>
        <br/>
        <div className="game-list-content">
          <ul>
            {userGames.map((game) => {
              return (
                <li key={game.id}>
                  <Link to={{ pathname: `/game/${game.id}` }}>
                    {game.whiteUsername} <small>{'vs'}</small> {game.blackUsername}
                  </Link>
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
  return bindActionCreators({ loadGames, initGame }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GameList)

// filter by
  //date
  //white/black
  //username