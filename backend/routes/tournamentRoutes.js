const express = require("express");
const {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  getTournamentByOrganizorId
} = require("../controller/tournamentController");
const upload = require('../middleware/multer');
const router = express.Router();

router.get("/tournament/:organizerId", getTournamentByOrganizorId);

router.route("/")
  .post(upload.single('image'), createTournament)
  .get(getTournaments);



router.route("/:id")
  .get(getTournamentById)
  .put(updateTournament)
  .delete(deleteTournament);

module.exports = router;
