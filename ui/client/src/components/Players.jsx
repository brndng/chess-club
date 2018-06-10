import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

axios.defaults.withCredentials = true;


class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbPlayers: [],
      players: [],
      targetPlayer: '',
      white: null,
      black: null,
    }
  }

  async componentDidMount() {
    const dbPlayers = await axios.get(`http://localhost:3000/users/players`);
    this.setState({ 
      dbPlayers: [...dbPlayers.data],
      players: [...dbPlayers.data]
    });
  }

  componentWillUnmount() {
    console.log('CWU PLAYERS')
  }

  setMatchup(color, opponent) {
    const { user } = this.props;
    if (color === 'white') {
      this.setState({ white: user.id, black: opponent });
    } else {
      this.setState({ white: opponent, black: user.id });
    }
  }

  challengePlayer() {
    const { white, black } = this.state;
    axios.post('http://localhost:3000/games/challenge', { white, black });
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
    const { players, targetPlayer } = this.state;
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
                          <div>{username}</div>
                          <div>
                            <div>
                              <select className="slct" onChange={(e) => this.setMatchup(e.target.value, id)}>
                                <option value={null} defaultValue>Select Color:</option>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                              </select>
                            </div>
                            <div>
                              <button className="btn btn-challenge" onClick={() => {this.challengePlayer()}}>CHALLENGE</button>
                            </div>
                          </div>
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

