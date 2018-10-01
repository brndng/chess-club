import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board.jsx';
import { printRanks, printFiles } from '../../../../rules/utilities/';

class BoardContainer extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    const { user, game, index, showCoords } = this.props;
    const isDisplayed = showCoords && 'is-displayed';
    const ranks = printRanks(user.id, game.white);
    const files = printFiles(user.id, game.white);
    return (
      <div className="outer-board-container">
        <div className="coords-files">
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

const mapStateToProps = ({ user, game, showCoords }) => {
  return { user, game, showCoords };
}

export default connect(mapStateToProps)(BoardContainer);
