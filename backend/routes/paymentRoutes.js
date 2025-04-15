const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post('/verify', async (req, res) => {
  const { token, amount } = req.body;
  console.log(token, amount);

  try {
    const response = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      { token, amount },
      {
        headers: {
          Authorization: `Key test_secret_key_d7a7c38e87b448acb164402bb7b22696`, // ✅ Use your test secret key here
        },
      }
    );

    // ✅ Optional: Store response.data to your DB
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
