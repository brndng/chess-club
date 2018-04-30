import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Square from './Square.jsx';
import togglePlaced from '../actions/action-toggle-placed.js';

class Board extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   placed: false,
    //   whiteToMove: true,
    // }
    this.state = {
      matrix: [],
      // placed: false,
    }
  }

  componentDidMount() {
    const dataDB = [ //todo: fetch current matrix from DB to initialize state/store
      ['r','n','b','q','k','b','n','r'],
      ['p','p','p','p','p','p','p','p'],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ]
    this.setState({ matrix: dataDB });
  }

  componentDidUpdate() {
    const { placed, togglePlaced } = this.props;

    if (placed) {
      this.setState({ matrix: this.props.currentPosition });
      togglePlaced();
    }
    
  }

  // togglePlaced() {
  //   this.state.placed ? 
  //     this.setState({ placed: false }) :
  //     this.setState({ placed: true });
  // }

  // toggleTurn() {
  //   this.state.whiteToMove ?
  //     this.setState({ whiteToMove: false }) :
  //     this.setState({ whiteToMove: true })
  // }

  // createRow(rank) {
  //   const row = [];
  //   const files = 'abcdefgh';
  //   for (let i=0; i<8; i++) {
  //     let file = files[i];
  //     row[i] = <Square 
  //       files={files}
  //       rank={rank} 
  //       file={file}
  //       togglePlaced={this.togglePlaced.bind(this)}
  //       placed={this.state.placed}
  //       toggleTurn={this.toggleTurn.bind(this)}
  //       whiteToMove={this.state.whiteToMove}
  //       key={i} />;
  //   }
  //   return <div className="row">{row}</div>;
  // }

  render() {
    const { matrix, placed } = this.state; //todo: move matrix to store?
    return (
      <div className="board">
        {matrix.map((row, i) => 
          <div className="row" key={i}>{row.map((elem, j) => 
            <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
          </div>)}
      </div>
    );
  }

  // render() {
  //   console.log('whiteToMove:', this.state.whiteToMove, 'placed:', this.state.placed)
  //   return (
  //     <div>
  //       <h3>{this.state.whiteToMove ? 'White To Move' : 'Black To Move'}</h3>
  //       <div className="board">
  //         {this.createRow(8)}
  //         {this.createRow(7)}
  //         {this.createRow(6)}
  //         {this.createRow(5)}
  //         {this.createRow(4)}
  //         {this.createRow(3)}
  //         {this.createRow(2)}
  //         {this.createRow(1)}
  //       </div>
  //     </div>
      
  //   );
  // }
}

const mapStateToProps = (state) => {
  return {
    currentPosition: state.currentPosition,
    placed: state.placed,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ togglePlaced }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Board);