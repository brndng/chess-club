import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square.jsx';
import axios from 'axios';

class Board extends Component {
  constructor(props) {
    super(props);
    const initialPosition = this.props.position;
    this.state = {
      matrix: initialPosition,
    }
  }
  async componentDidMount() {

    //TODO: AJAX CALL to initialize STORE
    // const dataDB = [ 
    //   ["r","n","b","q","k","b","n","r"],
    //   ["p","p","p","p","p","p","p","p"],
    //   [null,null,null,null,null,null,null,null],
    //   [null,null,null,null,null,null,null,null],
    //   [null,null,null,null,null,null,null,null],
    //   [null,null,null,null,null,null,null,null],
    //   ["P", "P", "P", "P", "P", "P", "P", "P"],
    //   ["R", "N", "B", "Q", "K", "B", "N", "R"]
    // ]
    // console.log('this.props.position',this.props.position);
    // const dataDB = this.props.position;
    // this.setState({ matrix: dataDB });
  }

  

  componentDidUpdate(prevProps, prevState) {
    const { currentPosition } = this.props;
    const { matrix } = prevState;
    if (JSON.stringify(matrix) !== JSON.stringify(currentPosition)) {
      this.setState({ matrix: currentPosition });
    }
  }

  // render() {
  //   const { matrix } = this.state;
  //   return (
  //     <div className="board">
  //       {matrix.map((row, i) => 
  //         <div className="row" key={i}>{row.map((elem, j) => 
  //           <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
  //         </div>)}
  //     </div>
  //   );
  // }

  // sendToDb() {
  //   axios.post('http://localhost:3000/games/challenge', { 
  //    "position": this.props.currentPosition,
  //    "moves": this.props.moveList,
  //    "accepted": false,
  //    "id_white": 2,
  //    "id_black": 1
  //   }).then((data) => console.log('front end data', data))
  // }

  render() {
    console.log('rendering board')
    return (
      <div>
        {/* <button onClick={() => this.sendToDb()}>TESTING</button> */}
        <div className="board">
        {this.state.matrix.map((row, i) => 
          <div className="row" key={i}>{row.map((elem, j) => 
            <Square piece={elem} row={i} col={j} key={[i,j]}/>)}
          </div>)}
       </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('my board state', state)
  return {
    currentPosition: state.currentPosition,
    moveList: state.moveList
  }
}

export default connect(mapStateToProps)(Board);