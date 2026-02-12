const campaignService = require("../services/campaign.service");
const { reportToCSV } = require("../utils/reportCsvFormatter");

async function uploadCampaignData(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  try {
    const result = await campaignService.processCSV(req.file.buffer);
    return res.json({ message: "CSV processed successfully", ...result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

function getCampaignReport(req, res) {
  const report = campaignService.getCampaignReport();

  // Cache for 5 minutes
  res.set("Cache-Control", "public, max-age=300");

  // Content negotiation
  if (req.headers.accept && req.headers.accept.includes("text/csv"))
 {
    res.type("text/csv");
    return res.send(reportToCSV(report));
  }

  return res.json(report);
}

module.exports = {
  uploadCampaignData,
  getCampaignReport
};
