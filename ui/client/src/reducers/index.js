import { combineReducers } from 'redux';
import SelectionReducer from './reducer-selection.js';
import WhiteToMoveReducer from './reducer-white-tomove.js';
import CurrentPositionReducer from './reducer-current-position.js';
import MoveListReducer from './reducer-move-list.js';
import GameReducer from './reducer-game-snapshot.js';
import UserGamesReducer from './reducer-user-games.js';
import UserIdReducer from './reducer-user-id.js';
import InCheckReducer from './reducer-in-check.js';

//import all individual reducers
export default combineReducers({
  selection: SelectionReducer,
  currentPosition: CurrentPositionReducer,
  whiteToMove: WhiteToMoveReducer,
  moveList: MoveListReducer,
  game: GameReducer,
  userGames: UserGamesReducer,
  userId: UserIdReducer,
  inCheck: InCheckReducer,
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the application..."smart"