import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    }
  }

  async componentDidMount() {
    const players = await axios.get(`http://localhost:3000/users/players`);
    this.setState({ players: [...players.data] });
  }

  challengePlayer() {
    axios.post('http://localhost:3000/games/challenge', {
      "position": [ 
          ["r","n","b","q","k","b","n","r"],
          ["p","p","p","p","p","p","p","p"],
          [null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null],
          ["P", "P", "P", "P", "P", "P", "P", "P"],
          ["R", "N", "B", "Q", "K", "B", "N", "R"]
        ],
      "whiteToMove": true,
      "moves": [],
      "inCheck": null,
      "accepted": true,
      "completed": false,
      "white": 1,
      "black": 2
    });
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
