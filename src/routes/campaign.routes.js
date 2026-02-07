const express = require("express");
const router = express.Router();
const multer = require("multer");

const campaignController = require("../controllers/campaign.controller");

// store file in memory (simple for now)
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/campaigns/upload",
  upload.single("file"),
  campaignController.uploadCampaignData
);

module.exports = router;
