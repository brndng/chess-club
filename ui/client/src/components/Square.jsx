import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);
    const { file, rank } = props;
    const pieces = {
      a8:'r',
      b8:'k',
      c8:'b',
      d8:'q',
      e8:'k',
      f8:'b',
      g8:'k',
      h8:'r',
      a7:'p',
      b7:'p',
      c7:'p',
      d7:'p',
      e7:'p',
      f7:'p',
      g7:'p',
      h7:'p',
      a1:'r',
      b1:'k',
      c1:'b',
      d1:'q',
      e1:'k',
      f1:'b',
      g1:'k',
      h1:'r',
      a2:'p',
      b2:'p',
      c2:'p',
      d2:'p',
      e2:'p',
      f2:'p',
      g2:'p',
      h2:'p',
    }
    this.state = { 
      file, 
      rank,
      currentPiece: pieces[file+rank] || ' ',
      validMoveOption: false,
     }
  }

  displayCoordinate() {
    const { file, rank } = this.state;
    console.log(file+rank);
  }

  render() {
    return (
      <div className="square">
        <button onClick={() => this.displayCoordinate()}>
          {this.state.currentPiece}
        </button>
      </div>
    )
  }
}

export default Square;