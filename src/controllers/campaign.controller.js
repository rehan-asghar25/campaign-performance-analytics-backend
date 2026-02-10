const campaignService = require("../services/campaign.service");

async function uploadCampaignData(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }

 try {
  const result = await campaignService.processCSV(req.file.buffer);
  res.json({ message: "CSV processed successfully", ...result });
} catch (err) {
  res.status(400).json({ error: err.message });
}

}


const { reportToCSV } = require("../utils/reportCsvFormatter");

function getCampaignReport(req, res) {
  const report = campaignService.getCampaignReport();
 const { reportToCSV } = require("../utils/reportCsvFormatter");

function getCampaignReport(req, res) {
  const report = campaignService.getCampaignReport();

  if (req.accepts("text/csv")) {
    res.type("text/csv");
    return res.send(reportToCSV(report));
  }

  res.json(report);
}

}

module.exports = {
  uploadCampaignData,
  getCampaignReport
};
