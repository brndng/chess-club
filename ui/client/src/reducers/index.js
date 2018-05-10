import { combineReducers } from 'redux';
import SelectionReducer from './reducer-selection.js';
import WhiteToMoveReducer from './reducer-white-tomove.js';
import CurrentPositionReducer from './reducer-current-position.js';
import MoveListReducer from './reducer-move-list.js';
import GameSnapshotReducer from './reducer-game-snapshot.js';
import UserGamesReducer from './reducer-user-games.js';
import UserIdReducer from './reducer-user-id.js';

//import all individual reducers
export default combineReducers({
  selection: SelectionReducer,
  currentPosition: CurrentPositionReducer,
  whiteToMove: WhiteToMoveReducer,
  moveList: MoveListReducer,
  gameSnapshot: GameSnapshotReducer,
  userGames: UserGamesReducer,
  userId: UserIdReducer,
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the application..."smart"