import { combineReducers } from 'redux';
import PiecesReducer from './reducer-pieces.js';
import PieceToMoveReducer from './reducer-piece-tomove.js';
import OriginSquareReducer from './reducer-origin-square.js';

//import all individual reducers

export default combineReducers({
  pieces: PiecesReducer,
  pieceToMove: PieceToMoveReducer,
  originSquare: OriginSquareReducer,
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the application..."smart"