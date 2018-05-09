import { combineReducers } from 'redux';
import PieceToMoveReducer from './reducer-piece-tomove.js';
import OriginSquareReducer from './reducer-origin-square.js';
import WhiteToMoveReducer from './reducer-toggle-turn.js';
import CurrentPositionReducer from './reducer-current-position.js';
import MoveListReducer from './reducer-move-list.js';
import GameStateReducer from './reducer-game-state.js';
import UserGamesReducer from './reducer-user-games.js';
import UserIdReducer from './reducer-user-id.js';

//import all individual reducers
export default combineReducers({
  pieceToMove: PieceToMoveReducer,
  originSquare: OriginSquareReducer,
  currentPosition: CurrentPositionReducer,
  whiteToMove: WhiteToMoveReducer,
  moveList: MoveListReducer,
  gameState: GameStateReducer,
  userGames: UserGamesReducer,
  userId: UserIdReducer,
});

// reducers take in actions and update part of application's state, sends to store
// reducers determine how actions will change the application..."smart"