const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Or use MongoDB Atlas URI
const dbName = "scraping_db";
const collectionName = "trending_topics";

async function saveToDatabase(data) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(data);
  } finally {
    await client.close();
  }
}

module.exports = { saveToDatabase };
