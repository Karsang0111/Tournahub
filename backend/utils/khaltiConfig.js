// src/utils/khaltiConfig.js
import axios from "axios";

const config = {
  publicKey: "test_public_key_xxx", // replace with your Khalti public key
  productIdentity: "tournament_01",
  productName: "Tournament Entry",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      console.log("Khalti Success Payload:", payload);
      // Send payload to your backend to verify the payment
      axios
        .post("http://localhost:5000/api/payment/verify", payload)
        .then(res => {
          alert("Payment Verified. Now you can join.");
          // You can now show the join form
        })
        .catch(err => {
          console.error("Payment verification failed", err);
        });
    },
    onError(error) {
      console.error("Khalti Payment Error:", error);
      alert("Payment Failed");
    },
    onClose() {
      console.log("Khalti widget closed");
    },
  },
  paymentPreference: ["KHALTI"],
};

export default config;
