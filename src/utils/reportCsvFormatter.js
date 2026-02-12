function reportToCSV(report) {
  const headers = Object.keys(report).join(",");
  const values = Object.values(report).join(",");

  return `${headers}\n${values}`;
}

module.exports = {
  reportToCSV
};
