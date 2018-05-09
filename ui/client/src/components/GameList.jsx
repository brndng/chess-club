import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Game from './Game.jsx';
import loadGames from '../actions/action-load-games.js';

class GameList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: null,
      initialPosition: [],
    }
  }

  async componentDidMount() {
    const { loadGames, userId } = this.props;
    const games = await axios(`http://localhost:3000/games/all/${userId}`)
    console.log('games cdm',games)
    loadGames(games.data);
  }

  setLocalState(id, position) {
    this.setState({ gameId: id, initialPosition: position });
  }

  render() {
    const { userGames } = this.props;
   
    return (
      <div>
        {userGames.map((game, i) => {
          // let { id, position, whiteToMove } = game;
          // const { id, position, whiteToMove } = game;
          return <li key={i}><a href="#" onClick={()=>this.setLocalState(game.id, game.position)}>{`GAME # ${game.id}`}</a></li>
        })}
        <br/>
        {this.state.gameId === null ? null: <Game position={this.state.initialPosition} id={this.state.gameId} />}
      </div>
    )
  }

  // render() {
  //   const { userGames } = this.props;
  //   console.log('userGames', userGames)
  //   return (
  //     <div>
  //       {userGames.map((game, i) => {
  //         let { id, white, black, position } = game;
  //         return <Game 
  //           id={id} 
  //           white={white} 
  //           black={black} 
  //           position={position} 
  //           key={i}/>
  //       })}
  //     </div>
  //   )
  // }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userGames: state.userGames,
    whiteToMove: state.whiteToMove,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ loadGames }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GameList)