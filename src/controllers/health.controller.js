const healthService = require("../services/health.service");

function healthCheck(req, res) {
  const data = healthService.getHealthStatus();
  res.json(data);
}

module.exports = {
  healthCheck
};
