function getHealthStatus() {
  return {
    status: "ok",
    message: "Backend is running"
  };
}

module.exports = {
  getHealthStatus
};
