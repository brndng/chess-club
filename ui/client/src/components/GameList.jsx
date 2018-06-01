import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import Game from './Game.jsx';
import { loadGames, initGame } from '../actions/';

class GameList extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { loadGames, userId } = this.props;
    const games = await axios(`http://localhost:3000/games/all/${userId}`)
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
    console.log('this.props.game from gamelist:', game)
    return (
      <div>
        YOUR GAMES
        {userGames.map((game) => {
          return (
            <li key={game.id}>
              <Link to={{ pathname: '/game', state: {id: game.id} }}>
                {`# ${game.id}: ${game.white} vs. ${game.black}`}
              </Link>
            </li>)
        })}
        <br/>
      </div>
    )
  }
}

const mapStateToProps = ({ userId, userGames, game }) => {
  return { userId, userGames, game };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ loadGames, initGame }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GameList)