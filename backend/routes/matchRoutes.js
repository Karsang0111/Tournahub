router.post("/update/:matchId", async (req, res) => {
    try {
      const { matchId } = req.params;
      const { score1, score2 } = req.body;
  
      const match = await Match.findById(matchId);
      if (!match) return res.status(404).json({ message: "Match not found." });
  
      match.score1 = score1;
      match.score2 = score2;
      match.winner = score1 > score2 ? match.team1 : match.team2;
      match.status = "completed";
  
      await match.save();
      req.app.get("io").emit("matchUpdate", match);
  
      res.status(200).json(match);
    } catch (error) {
      console.error("Error updating match:", error.message);
      res.status(500).json({ message: "Error updating match." });
    }
  });
  