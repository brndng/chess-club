import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { storeOpponent } from '../actions/';

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
    const { players, targetPlayer } = this.state;
    const { user, opponent, storeOpponent } = this.props;
    return (
      <div className="players-select">
        <div className="players-search">
          <input type="search" placeholder="Username" value={targetPlayer} onChange={(e) => {this.setSearchText(e)}} />
          <button className="players-search-button" onClick={() => {this.filterPlayers()}}>⌕</button>
        </div>
        <div className="players-default">
          <p>SELECT OPPONENT</p>
          <div className="players-list">
            <ul>{players.length === 0 &&
              <div className="players-invalid">
                <span>{`Sorry, that player doesn't exist`}</span>
                <button className="btn" onClick={() => {this.displayAllPlayers()}}>Display All</button>
              </div>}
              {players.map(player => {
                const opponent = { id: player.id, username: player.username };
                if (user.id !== player.id) {
                  return (
                    <li key={player.id}>
                      <div>
                        <a href="#" onClick={() => storeOpponent(opponent)}>{opponent.username}</a>
                      </div>
                    </li>
                  );
                }})}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ storeOpponent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Players);