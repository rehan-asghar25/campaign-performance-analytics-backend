const express = require("express");

const app = express();

// Global middleware
app.use(express.json());

// Routes
const healthRoutes = require("./routes/health.routes");
app.use("/", healthRoutes);

module.exports = app;
