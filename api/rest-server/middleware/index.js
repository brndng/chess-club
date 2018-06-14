const { willMoveExposeKing } = require('../../../rules/interactions/');
const verifyLegalSquare = require('../../../rules/movement/');

module.exports = {
  isAuthenticated: (req, res, next) => {
    console.log('///rules isAuthenticated req.session.user', req.session.user)
    if (req.session.user) {
      next();
    } else {
      res.status(401).send('No hacks allowed. You must be logged in to do that.');
    }
  },
  isLegalMove: (req, res, next) => {
    const { user, game, selection, destin, prevPosition, moves } = req.body;
    const _moveExposesKing = willMoveExposeKing(user.id, game.white, selection, destin, prevPosition, moves);
    console.log('​///_moveExposesKing', _moveExposesKing);
    const _isLegalSquare = verifyLegalSquare(selection.piece, selection.origin, destin, prevPosition, moves);
    console.log('​////_isLegalSquare', _isLegalSquare);
    if (!_moveExposesKing && _isLegalSquare) {
      next();
    } else {
      res.status(401).send('No hacks allowed. You must make a legal move.');
    }
  }
}

