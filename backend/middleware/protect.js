const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to Protect Routes
const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found. Unauthorized." });
      }

      req.user = user;
      req.user.role = decoded.role; // Optional: trust token role for consistency

      next();
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

// ✅ Middleware for Admins Only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

// ✅ Optional: Middleware for multiple roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

module.exports = { protect, adminOnly, restrictTo };
