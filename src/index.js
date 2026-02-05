const express = require("express");

const app = express();
const PORT = 3000;

// Basic middleware
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
