import { combineReducers } from 'redux';
import PiecesReducer from './reducer-pieces.js';
import SelectedPieceReducer from './reducer-selected-piece.js';

//import all individual reducers

export default combineReducers({
  pieces: PiecesReducer,
  selectedPiece: SelectedPieceReducer,
  // users: UserReducer,
  // activeUser: ActiveUserReducer,
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the application..."smart"