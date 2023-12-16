require("dotenv").config({path: "./config.env"})

const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const files = require('./fileRoutes')
const users = require('./userRoutes')
const dbo = connect;

const app = express();
app.use(cors());
app.use(express.json());
app.use(files)
app.use(users)

const PORT = 3000;
app.listen(PORT, async () => {
    // perform a database connection when server starts
    await dbo.connectToServer((err) => {
      if (err) console.log(err);

    });
    console.log(`Server is running on port: ${PORT}`);
  });