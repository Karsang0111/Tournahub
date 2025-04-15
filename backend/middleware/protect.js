const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to Protect Routes
const protect = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the user information from the token to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
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
