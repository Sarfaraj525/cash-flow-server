const express = require("express");

const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());



console.log(process.env.DB_PASS);

const mongoDBUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uqi3nbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(mongoDBUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Cash Flow is running");
});

app.listen(port, () => {
  console.log(`Cash Flow Server is running on port ${port}`);
});
