const campaignService = require("../services/campaign.service");

async function uploadCampaignData(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  const result = await campaignService.processCSV(req.file.buffer);

  res.json({
    message: "CSV processed successfully",
    totalRecords: result.totalRecords
  });
}

module.exports = {
  uploadCampaignData
};
