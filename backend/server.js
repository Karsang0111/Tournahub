const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/RolesRouter/authRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const participantRoutes = require("./routes/playerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const announcementRouter = require("./routes/announcementRouter");
const teamRoutes = require("./routes/teamRoutes");
const winnerRouter = require("./routes/winnerRouter");
const axios = require('axios');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app & HTTP server
const app = express();
const server = createServer(app);
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true, // allow cookies & credentials
}));
app.use(morgan("dev"));

// Initialize Socket.IO for real-time updates
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN || "*" },
});

// Store io instance globally
app.set("io", io);

// Handle WebSocket Connections
io.on("connection", (socket) => {
  console.log(`🟢 Client Connected: ${socket.id}`);

  // Handle incoming custom events
  socket.on("matchUpdate", (data) => {
    console.log("Match update received:", data);
    io.emit("matchUpdate", data); // Broadcast update to all clients
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client Disconnected: ${socket.id}`);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/winners", winnerRouter);
app.use("/api/announcements", announcementRouter);

// Default API Route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error: ", err.message);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});


// live match details




// Graceful Shutdown Handling
const shutdown = () => {
  console.log("🛑 Shutting down server...");
  server.close(() => {
    console.log("✅ HTTP server closed.");
    process.exit(0);
  });
};

// Handle termination signals
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
