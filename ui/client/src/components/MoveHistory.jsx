import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { printMoves } from '../../rules/utilities';

class MoveHistory extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { moves } = this.props;
    const chessMoves = printMoves(moves);
    return (
      <ol>
        {chessMoves.map((pair, i) => (
          <li key={i}>
            <div className="move-row">
              <div>{pair[0]}</div>
              <div>{pair[1]}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

const mapStateToProps = ({ userId, game, moves }) => {
  return { userId, game, moves };
}

export default connect(mapStateToProps)(MoveHistory);