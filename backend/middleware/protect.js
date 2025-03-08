const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to Protect Routes (Auth Required)
const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user in DB & exclude password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found. Unauthorized." });
      }

      next(); // Move to next middleware
    } else {
      throw new Error("No token provided.");
    }
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(401).json({
      message: error.message === "jwt malformed" ? "Invalid token." : error.message,
    });
  }
};

// ✅ Middleware to Restrict Access to Admins Only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { protect, adminOnly };
