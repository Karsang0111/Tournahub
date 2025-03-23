const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/verify", async (req, res) => {
  const { token, amount } = req.body;

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      { token, amount },
      {
        headers: {
          Authorization: `Key YOUR_SECRET_KEY_HERE`,
        },
      }
    );

    res.status(200).json({ message: "Payment verified", payload: response.data });
  } catch (err) {
    console.error("Khalti Verification Error:", err.response?.data || err.message);
    res.status(400).json({ message: "Payment verification failed" });
  }
});

module.exports = router;
