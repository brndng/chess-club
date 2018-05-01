import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Square from './Square.jsx';
import togglePlaced from '../actions/action-toggle-placed.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [],
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

  render() {
    const { matrix, placed } = this.state; 
    return (
      <div className="board">
        {matrix.map((row, i) => 
          <div className="row" key={i}>{row.map((elem, j) => 
            <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
          </div>)}
      </div>
    );
  }
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