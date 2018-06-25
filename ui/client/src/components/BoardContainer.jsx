import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board.jsx';
import { printRanks, printFiles } from '../../../../rules/utilities/';

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCoords: false,
    };
  }

  toggleCoords() {
    this.setState({
      showCoords: !this.state.showCoords,
    });
  }

  render() {
    const { user, game, index } = this.props;
    const { showCoords } = this.state;
    const isDisplayed = showCoords && "is-displayed";
    const ranks = printRanks(user.id, game.white);
    const files = printFiles(user.id, game.white);
    return (
      <div className="outer-board-container">
        <div className="coords-files">
          <div className="switch-container">
            <label className="switch">
              <input type="checkbox" defaultChecked={showCoords} onChange={() => this.toggleCoords()} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="board-container">
          <div className="coords-ranks">
            {ranks.map((rank, i) => 
              <div className={`rank ${isDisplayed}`} key={i}>
                {rank}
              </div>)}
          </div>
          <Board index={index} />
          <div className="coords-ranks"></div>
        </div>
        <div className="coords-files">
          {files.map((file, i) => 
            <div className={`file ${isDisplayed}`} key={i}>
              {file}
            </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, game }) => {
  return { user, game };
}

export default connect(mapStateToProps)(BoardContainer);