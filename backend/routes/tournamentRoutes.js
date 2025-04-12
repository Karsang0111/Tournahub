const express = require("express");
const {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
} = require("../controller/tournamentController");

const router = express.Router();

router.route("/")
  .post(createTournament)
  .get(getTournaments);

router.route("/:id")
  .get(getTournamentById)
  .put(updateTournament)
  .delete(deleteTournament);

module.exports = router;
