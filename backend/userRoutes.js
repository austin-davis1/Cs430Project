const express = require("express")
const aws = require('./storageService')

const userRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./connect");
const ObjectId = require("mongodb").ObjectId;

const bcrypt = require('bcrypt')
const saltRounds = 7;

// Retrieve All Users
userRoutes.route("/users").get((request, response) => {
    let db_connect = dbo.getDb();
    db_connect.collection("Users")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            response.json(result);
        });
});
   
// Retrieve a user by its id
userRoutes.route("/users/:id").get((request, response) => {
    let db_connect = dbo.getDb(); 
    let myquery = { _id: ObjectId(request.params.id) };
    db_connect.collection("Users")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            response.json(result);
        });
});

// Create User
userRoutes.route("/users").post(async function (request, response) {
    let db_connect = dbo.getDb();

    let data = JSON.parse(request.body.data)

    const takenUsername = await db_connect.collection("Users").findOne({username: data.username})
    const takenEmail = await db_connect.collection("Users").findOne({email: data.email})

    if (takenUsername || takenEmail) {
        console.log("TAKEN!!!!")
      response.json({message: "Username or email has already been taken"})
    } else {
        let hash = await bcrypt.hash(data.password, saltRounds)
        let myobj = {
            email: data.email,
            username: data.username,
            password: hash,
            joinDate: data.joinDate,
            files: data.files
        };
    
        db_connect.collection("Users")
            .insertOne(myobj, (err, result) => {
                if (err) throw err;
                response.json(result);
            });
    }
});

/**
 * Verify a user login
 */
userRoutes.route("/users/login").post(async function (request, response) {
    let db_connect = dbo.getDb();
    let data = JSON.parse(request.body.data)
    const userObj = await db_connect.collection("Users").findOne({email: data.email})

    if (userObj) {
        let confirmation = await bcrypt.compare(data.password, userObj.password)
        console.log(confirmation)
        response.json({success: confirmation, userObj})
    } else {
        console.log("No email was found")
        response.json({success: false, message: "No email was found"})
    }
});

module.exports = userRoutes