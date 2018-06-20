const { willMoveExposeKing } = require('../../../rules/interactions/');
const verifyLegalSquare = require('../../../rules/movement/');

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send('No hacks allowed. You must be logged in to do that.');
    }
  },
  isLegalMove: (req, res, next) => {
    const { user, game, selection, destin, prevPosition, prevMoves } = req.body;
    const _moveExposesKing = willMoveExposeKing(user.id, game.white, selection, destin, prevPosition, prevMoves);
    const _isLegalSquare = verifyLegalSquare(selection.piece, selection.origin, destin, prevPosition, prevMoves);
    
    if (!_moveExposesKing && _isLegalSquare) {
      next();
    } else {
      res.status(401).send('No hacks allowed. You must make a legal move.');
    }
  }
}

