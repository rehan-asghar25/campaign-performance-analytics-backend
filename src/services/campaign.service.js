const csv = require("csv-parser");
const { Readable } = require("stream");

let campaignsData = []; // in-memory storage

function processCSV(buffer) {
  return new Promise((resolve, reject) => {
    const records = [];

    const stream = Readable.from(buffer.toString());

    stream
     .pipe(csv())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        campaignsData = records; // overwrite old data
        resolve({ totalRecords: records.length });
      })
      .on("error", reject);
  });
}

function getCampaignReport() {
  let totalClicks = 0;
  let totalImpressions = 0;
  let totalConversions = 0;

  campaignsData.forEach((row) => {
   const clicks = Number((row.EmailClicks || '0').replace(/,/g, ''));
const visits = Number((row.WebsiteVisits || '0').replace(/,/g, ''));

totalClicks += clicks;
totalImpressions += visits;

    if (Number(row.Conversion) === 1) {
        totalConversions++;
}

  });

  const conversionRate =
  totalClicks > 0
    ? ((totalConversions / totalClicks) * 100).toFixed(2) 
    : '0%';


  return {
    totalRecords: campaignsData.length,
    totalClicks,
    totalImpressions,
    totalConversions,
    conversionRate: `${conversionRate}%`
  };
}

module.exports = {
  processCSV,
  getCampaignReport
};
