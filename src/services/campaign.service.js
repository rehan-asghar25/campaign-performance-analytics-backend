const csv = require("csv-parser");
const { Readable } = require("stream");

function processCSV(buffer) {
  return new Promise((resolve, reject) => {
    let count = 0;

    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csv())
      .on("data", () => {
        count++;
      })
      .on("end", () => {
        resolve({ totalRecords: count });
      })
      .on("error", reject);
  });
}

module.exports = {
  processCSV
};
