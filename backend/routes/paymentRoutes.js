const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// 🔹 KHALTI VERIFY: POST /api/payment/verify
router.post("/verify", async (req, res) => {
  const { pidx } = req.body;

  if (!pidx) {
    return res.status(400).json({ success: false, message: "Missing pidx for verification." });
  }

  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/payment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if (data.status === "Completed") {
      return res.json({ success: true, message: "Khalti payment verified successfully", data });
    } else {
      return res.status(400).json({ success: false, message: "Khalti payment not completed", data });
    }
  } catch (err) {
    console.error("🔴 Khalti Verification Error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Khalti payment verification failed",
      error: err.response?.data || err.message,
    });
  }
});

// 🔹 ESEWA VERIFY: GET /api/payment/esewa-success
router.get("/esewa-success", async (req, res) => {
  const { amt, pid, rid } = req.query;

  if (!amt || !pid || !rid) {
    return res.status(400).send("Missing required parameters for eSewa verification.");
  }

  try {
    const verificationURL = `https://uat.esewa.com.np/epay/transrec`;
    const payload = new URLSearchParams({
      amt,
      scd: process.env.ESEWA_MERCHANT_CODE,
      pid,
      rid,
    });

    const response = await axios.post(verificationURL, payload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const success = response.data.includes("<response_code>Success</response_code>");

    if (success) {
      return res.redirect(`${process.env.ESEWA_SUCCESS_URL}?pid=${pid}&refId=${rid}&amt=${amt}`);
    } else {
      return res.redirect(`${process.env.ESEWA_FAILURE_URL}`);
    }
  } catch (err) {
    console.error("🔴 eSewa Verification Error:", err.message);
    return res.redirect(`${process.env.ESEWA_FAILURE_URL}`);
  }
});

module.exports = router;
