const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    // Check if Authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database using the decoded ID
      req.user = await User.findById(decoded.id).select("-password"); // Exclude password from returned user data

      if (!req.user) {
        return res.status(401).json({ message: "User not found. Unauthorized." });
      }

      next(); // Proceed to the next middleware or route handler
    } else {
      // If no Authorization header or token is provided
      throw new Error("No token provided.");
    }
  } catch (error) {
    // Handle token verification or decoding errors
    console.error("Authorization Error:", error.message);
    return res.status(401).json({
      message: error.message === "jwt malformed" ? "Invalid token." : error.message,
    });
  }
};

module.exports = { protect };
