const router = require("express").Router();
const gamesController = require("../controllers/games.js");
const { isUserAuthenticated, isMoveValidated } = require("../middleware/");

router.route("/:id").get(isUserAuthenticated, gamesController.fetchGame);
router
  .route("/all/:user_id")
  .get(isUserAuthenticated, gamesController.fetchAllGames);
router
  .route("/challenge")
  .post(isUserAuthenticated, gamesController.createGame);
router
  .route("/move")
  .put(isUserAuthenticated, isMoveValidated, gamesController.registerMove);
router.route("/check").put(isUserAuthenticated, gamesController.updateCheck);
router
  .route("/document")
  .put(isUserAuthenticated, gamesController.documentGame);
router.route("/resign").put(isUserAuthenticated, gamesController.resign);
router
  .route("/draw/offer")
  .put(isUserAuthenticated, gamesController.registerDrawOffer);
router
  .route("/draw/accept")
  .put(isUserAuthenticated, gamesController.acceptDraw);

module.exports = router;
