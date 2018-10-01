import { combineReducers } from "redux";
import selection from "./selection.js";
import whiteToMove from "./white-to-move.js";
import currentPosition from "./current-position.js";
import moves from "./moves.js";
import game from "./game.js";
import userGames from "./user-games.js";
import user from "./user.js";
import opponent from "./opponent.js";
import inCheck from "./in-check.js";
import completed from "./completed.js";
import isAuthenticated from "./is-authenticated.js";
import hasFetchedCurrUser from "./has-fetched-curr-user.js";
import promotingMove from "./promoting-move.js";
import result from "./result.js";
import positionHistory from "./position-history";
import isMyTurn from "./is-my-turn.js";
import showCoords from "./show-coords.js";
import showVisualizer from "./show-visualizer";
import squares from "./squares.js";

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
  squares
});
