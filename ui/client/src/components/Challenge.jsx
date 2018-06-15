import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChallengeCreator from './ChallengeCreator.jsx';

axios.defaults.withCredentials = true;

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbPlayers: [],
      players: [],
      targetPlayer: '',
      opponent: '',
    }
  }

  async componentDidMount() {
    const dbPlayers = await axios.get(`http://localhost:3000/users/players`);
    this.setState({ 
      dbPlayers: [...dbPlayers.data],
      players: [...dbPlayers.data]
    });
  }

  setSearchText(e) {
    this.setState({ targetPlayer: e.target.value });
  }

  filterPlayers() {
    const { dbPlayers, targetPlayer } = this.state;
    const results = dbPlayers.filter(player => player.username === targetPlayer);
    this.setState({
      players: results,
    });
  }

  displayAllPlayers() {
    const { dbPlayers } = this.state;
    this.setState({
      players: dbPlayers,
    });
  }

  selectPlayer(opponent) {
    this.setState({
      opponent,
    });
  }

  render() {
    const { players, targetPlayer, showModal, opponent } = this.state;
    const { user } = this.props;
    return (
      <div className="players-container">
        <div className="players-search">
            <input type="search" placeholder="Find a player..." value={targetPlayer} onChange={(e) => {this.setSearchText(e)}} />
            <button className="players-search-button" onClick={() => {this.filterPlayers()}}>⌕</button>
          </div>
        {players.length === 0
          ? <div className="players-invalid">
              Sorry, that player doesn't exist
              <button className="btn" onClick={() => {this.displayAllPlayers()}}>Display All</button>
            </div>
          : <div className="players-default">
              <div className="players-list">
                <div>
                  <p>SELECT OPPONENT</p>:
                </div>
                <ul>
                  {players.map(player => {
                    const opponent = { id: player.id, username: player.username };
                    if (user.id !== player.id) {
                      return (
                        <li key={player.id}>
                          <div>
                            <input type="radio" name="opponent" onClick={() => this.selectPlayer(opponent)} />
                            <label>{opponent.username}</label>
                          </div>
                        </li>
                      )
                    }})}
                </ul>
              </div>
              <div className="players-challenge">
                <ChallengeCreator opponent={opponent} />
              </div>
            </div>
          }
      </div>
    ) 
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
}

export default connect(mapStateToProps)(Challenge);

