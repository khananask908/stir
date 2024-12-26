const express = require("express");
const scrapeTwitterTrends = require("./scraper");
const { saveToDatabase } = require("./db");
const uuid = require("uuid");
const moment = require("moment");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/run-script", async (req, res) => {
  try {
    const trends = await scrapeTwitterTrends();

    const uniqueId = uuid.v4();
    const ipAddress = req.connection.remoteAddress; // You can get the IP address here

    const record = {
      _id: uniqueId,
      trends,
      date_time: moment().format(),
      ip_address: ipAddress,
    };

    // Save the data to MongoDB
    await saveToDatabase(record);

    // Send the result back as JSON
    res.json(record);
  } catch (error) {
    res.status(500).send("Error running the script");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
