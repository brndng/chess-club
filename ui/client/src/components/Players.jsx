import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChallengeCreator from './ChallengeCreator.jsx';

axios.defaults.withCredentials = true;

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbPlayers: [],
      players: [],
      targetPlayer: '',
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

  render() {
    const { players, targetPlayer, showModal } = this.state;
    const { user } = this.props;
    return (
      <div className="players-container">
        {players.length === 0
          ? <div className="players-invalid">
              Sorry, that player doesn't exist
              <button className="btn" onClick={() => {this.displayAllPlayers()}}>Display All</button>
            </div>
          : <div className="players-default">
              <div className="players-default-search">
                <input type="search" placeholder="Find a player..." value={targetPlayer} onChange={(e) => {this.setSearchText(e)}} />
                <button onClick={() => {this.filterPlayers()}}>Search</button>
              </div>
              <div className="players-list">
                <ul>
                  {players.map(player => {
                    let { id, username } = player;
                    if (user.id !== id) {
                      return (
                        <li key={id}>
                          <ChallengeCreator opponent={{ id, username }} />
                        </li>
                      )
                    }})}
                </ul>
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

export default connect(mapStateToProps)(Players);

