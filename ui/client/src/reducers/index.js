import { combineReducers } from 'redux';
import selection from './reducer-selection.js';
import whiteToMove from './reducer-white-to-move.js';
import currentPosition from './reducer-current-position.js';
import moves from './reducer-moves.js';
import game from './reducer-game.js';
import userGames from './reducer-user-games.js';
import user from './reducer-user.js';
import opponent from './reducer-opponent.js';
import inCheck from './reducer-in-check.js';
import completed from './reducer-completed.js';
import isAuthenticated from './reducer-is-authenticated.js';
import hasFetchedCurrUser from  './reducer-has-fetched-curr-user.js';
import promotingMove from './reducer-promoting-move.js';
import result from './reducer-result.js';
import positionHistory from './reducer-position-history';
import isMyTurn from './reducer-is-my-turn.js';
import showCoords from './reducer-show-coords.js';
import showVisualizer from './reducer-show-visualizer';
import squares from './reducer-squares.js';

export default combineReducers({
  selection,
  currentPosition,
  whiteToMove,
  moves,
  game,
  userGames,
  user,
  opponent,
  inCheck,
  completed,
  isAuthenticated,
  hasFetchedCurrUser,
  promotingMove,
  result,
  positionHistory,
  isMyTurn,
  showCoords,
  showVisualizer,
  squares,
});
