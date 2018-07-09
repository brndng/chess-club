import { combineReducers } from 'redux';
import SelectionReducer from './reducer-selection.js';
import WhiteToMoveReducer from './reducer-white-to-move.js';
import CurrentPositionReducer from './reducer-current-position.js';
import MovesReducer from './reducer-moves.js';
import GameReducer from './reducer-game.js';
import UserGamesReducer from './reducer-user-games.js';
import UserReducer from './reducer-user.js';
import OpponentReducer from './reducer-opponent.js';
import InCheckReducer from './reducer-in-check.js';
import CompletedReducer from './reducer-completed.js';
import IsAuthenticatedReducer from './reducer-is-authenticated.js';
import HasFetchedCurrUserReducer from  './reducer-has-fetched-curr-user.js';
import PromotingMoveReducer from './reducer-promoting-move.js';
import ResultReducer from './reducer-result.js';
import PositionHistoryReducer from './reducer-position-history';
import IsMyTurnReducer from './reducer-is-my-turn.js';
import ShowCoordsReducer from './reducer-show-coords.js';
import ShowVisualizerReducer from './reducer-show-visualizer';
import SquaresReducer from './reducer-squares.js';

export default combineReducers({
  selection: SelectionReducer,
  currentPosition: CurrentPositionReducer,
  whiteToMove: WhiteToMoveReducer,
  moves: MovesReducer,
  game: GameReducer,
  userGames: UserGamesReducer,
  user: UserReducer,
  opponent: OpponentReducer,
  inCheck: InCheckReducer,
  completed: CompletedReducer,
  isAuthenticated: IsAuthenticatedReducer,
  hasFetchedCurrUser: HasFetchedCurrUserReducer,
  promotingMove: PromotingMoveReducer,
  result: ResultReducer,
  positionHistory: PositionHistoryReducer,
  isMyTurn: IsMyTurnReducer,
  showCoords: ShowCoordsReducer,
  showVisualizer: ShowVisualizerReducer,
  squares: SquaresReducer,
});
