const express = require("express");
const app = express();

app.use(express.json());

const healthRoutes = require("./routes/health.routes");
const campaignRoutes = require("./routes/campaign.routes");

app.use("/", healthRoutes);
app.use("/", campaignRoutes);

module.exports = app;
