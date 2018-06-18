import React, { Component } from 'react';
import Board from './Board.jsx';

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
    const { showCoords } = this.state
    const isDisplayed = showCoords && "is-displayed";
    return (
      <div className="outer-board-container">
        <div className="upper-board-container">
          <label class="switch">
            <input type="checkbox" defaultChecked={showCoords} onChange={() => this.toggleCoords()} />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="mid-board-container">
          <div className="coords-ranks">{
            ranks.map((rank, i) => <div className={`rank ${isDisplayed}`} key={i}>{rank}</div>)
          }
          </div>
          <Board />
          <div className="coords-ranks"></div>
        </div>
        <div className="lower-board-container">
          <div className="coords-files">{
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