const csv = require("csv-parser");
const { Readable } = require("stream");

const REQUIRED_COLUMNS = [
  "WebsiteVisits",
  "Conversion"
];

const OPTIONAL_COLUMNS = [
  "EmailClicks"
];

let campaignsData = []; // in-memory storage

function processCSV(buffer) {
  return new Promise((resolve, reject) => {
    const records = [];

    const content = buffer.toString();
const separator = content.includes('\t') ? '\t' : ',';

const stream = Readable.from(content);

stream
  .pipe(csv({ separator }))

     .on("headers", (headers) => {
  // Validate required columns
  const missingRequired = REQUIRED_COLUMNS.filter(
    (col) => !headers.includes(col)
  );

  if (missingRequired.length > 0) {
    return reject(
      new Error(`Missing required column(s): ${missingRequired.join(", ")}`)
    );
  }

  // Identify available optional columns
  const availableOptional = OPTIONAL_COLUMNS.filter(
    (col) => headers.includes(col)
  );

  console.log("Optional columns detected:", availableOptional);
})


      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        campaignsData = records;
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
   const clicks = row.EmailClicks
  ? Number(row.EmailClicks.replace(/,/g, ""))
  : 0;

const visits = row.WebsiteVisits
  ? Number(row.WebsiteVisits.replace(/,/g, ""))
  : 0;


totalClicks += clicks;
totalImpressions += visits;

    if (Number(row.Conversion) === 1) {
        totalConversions++;
}

  });

  const conversionRate =
  totalClicks > 0
    ? ((totalConversions / totalClicks) * 100).toFixed(2) 
    : '0.00';


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
