import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

axios.defaults.withCredentials = true;


class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      white: null,
      black: null,
    }
  }

  async componentDidMount() {
    const players = await axios.get(`http://localhost:3000/users/players`);
    this.setState({ players: [...players.data] });
  }

  setMatchup(color, opponent) {
    const { userId } = this.props;
    if (color === 'white') {
      this.setState({ white: userId, black: opponent });
    } else {
      this.setState({ white: opponent, black: userId });
    }
  }

  challengePlayer() {
    const { white, black } = this.state;
    axios.post('http://localhost:3000/games/challenge', { white, black });
  }

  render() {
    const { players } = this.state;
    const { userId } = this.props;
    return (
      <div>
        <ul>
          {players.map(player => {
            let { id, username } = player;
            if (userId !== id) {
              return (
                <li key={id}>
                  <strong>{username}</strong>
                  <select onChange={(e) => this.setMatchup(e.target.value, id)}>
                    <option value={null} defaultValue>Select Color:</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                  </select>
                  <button onClick={() => {this.challengePlayer()}}>CHALLENGE</button>
                </li>
              )
            }})}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ userId }) => {
  return { userId };
}

export default connect(mapStateToProps)(Players);
