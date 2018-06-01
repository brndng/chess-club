import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Some Player</div>
        <div>Some Pieces</div>
      </div>
    );
  }
}

const mapStateToProps = ({ userId, game, moves }) => {
  return { userId, game, moves }
}

export default connect(mapStateToProps)(PlayerCard);