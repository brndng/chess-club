import { combineReducers } from 'redux';
import PieceToMoveReducer from './reducer-piece-tomove.js';
import OriginSquareReducer from './reducer-origin-square.js';
import PlacedReducer from './reducer-placed.js';
import ToggleTurnReducer from './reducer-toggle-turn.js';
import CurrentPositionReducer from './reducer-current-position.js';
import MoveListReducer from './reducer-move-list.js';

//import all individual reducers
export default combineReducers({
  pieceToMove: PieceToMoveReducer,
  originSquare: OriginSquareReducer,
  currentPosition: CurrentPositionReducer,
  placed: PlacedReducer,
  whiteToMove: ToggleTurnReducer,
  moveList: MoveListReducer,
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the application..."smart"