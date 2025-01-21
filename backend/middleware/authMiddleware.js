const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust this path to your User model if needed

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user details to the request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized. Invalid token." });
    }
  } else {
    return res.status(401).json({ message: "Not authorized. No token provided." });
  }
};

module.exports = { protect };
