import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Result from './Result.jsx';
import { printMoves } from '../../rules/utilities/';

class MoveHistory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { moves } = this.props;
    const chessMoves = printMoves(moves);
    return (
      <div className="move-history-container">
        <div className="move-history-output">
          <ol>
            {chessMoves.map((pair, i) => (
              <li key={i}>
                <div className="move-history-row">
                  <div>{pair[0]}</div>
                  <div>{pair[1]}</div>
                </div>
              </li>
            ))}
            <Result />
          </ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ moves }) => {
  return { moves };
}

export default connect(mapStateToProps)(MoveHistory);