import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  async componentDidMount() {
    const { id } = this.props;
    const user = await axios.get(`http://localhost:3000/users/profile/${id}`);
    const { username } = user.data;
    console.log('username', username);
    this.setState({ username })
  }

  render() {
    const { moves } = this.props;
    const { username } = this.state;
    return (
      <div className="player-card-container">
        <div className="player-card-username">
          {`${username}`}
        </div>
        <div className="player-card-pieces">
          Some Pieces
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userId, game, moves }) => {
  return { userId, game, moves }
}

export default connect(mapStateToProps)(PlayerCard);