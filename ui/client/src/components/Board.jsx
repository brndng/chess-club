import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square.jsx';

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

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.setState({ matrix: this.props.currentPosition });
    }
  }

  render() {
    const { matrix } = this.state;
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
  // console.log('my board state', state)
  return {
    currentPosition: state.currentPosition,
  }
}

export default connect(mapStateToProps)(Board);