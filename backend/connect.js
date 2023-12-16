require("dotenv").config({path: "./config.env"})
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;
 
module.exports = {
    connectToServer: async function (callback) {
        await client.connect(function (err, db) {
          // Verify we got a good "db" object
          if (db)
          {
            database = db.db("Project");
            console.log("Successfully connected to MongoDB.");
          }
          return callback(err);
             });
      },
 
  getDb: function () {
    return database;
  },
};