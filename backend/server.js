const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const participantRoutes = require("./routes/playerRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app & HTTP server
const app = express();
const server = createServer(app);

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests

// Initialize Socket.IO for real-time updates
const io = new Server(server, {
  cors: { origin: "*" }, // Allow all origins (Change this for production)
});

// Store io instance globally
app.set("io", io);

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log(`🟢 Client Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`🔴 Client Disconnected: ${socket.id}`);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/participants", participantRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error: ", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Server error. Please try again later.",
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
