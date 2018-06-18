import React, { Component } from 'react';
import Board from './Board.jsx';

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCoords: false,
    };
    this.showCoords = this.showCoords.bind(this);
    this.hideCoords = this.hideCoords.bind(this);
  }

  showCoords() {
    this.setState({
      showCoords: true,
    });
  }
  
  hideCoords() {
    this.setState({
      showCoords: false,
    });
  }

  render() {
    const isDisplayed = this.state.showCoords && "is-displayed";
    return (
      <div className="outer-board-container">
        <div className="upper-board-container">
        <button onClick={() => this.hideCoords()}>hide</button>

          <button onClick={() => this.showCoords()}>show</button>
        </div>
        <div className="mid-board-container">
          <div className="coords-ranks">
            {
              ranks.map((rank, i) => <div className={`rank ${isDisplayed}`} key={i}>{rank}</div>)
            }
          </div>
          <Board />
          <div className="coords-ranks"></div>
        </div>
        <div className="lower-board-container">
          <div className="coords-files">
            {
              files.map((file, i) => <div className={`file ${isDisplayed}`} key={i}>{file}</div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

var ranks = [8, 7, 6, 5, 4, 3, 2, 1];
var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default BoardContainer;