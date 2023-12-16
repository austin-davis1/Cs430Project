const express = require("express")
const multer = require('multer')

const fileRoutes = express.Router();
const aws = require('./storageService') 

// This will help us connect to the database
const dbo = require("./connect");
const ObjectId = require("mongodb").ObjectId;

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Retrieve All files
fileRoutes.route("/files").get((request, response) => {
    let db_connect = dbo.getDb();
    db_connect.collection("Files")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            response.json(result);
        });
});
   
// Retrieve a file by its id
fileRoutes.route("/files/:id").get((request, response) => {
    let db_connect = dbo.getDb(); 
    let myquery = { _id: ObjectId(request.params.id) };
    db_connect.collection("Files")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            response.json(result);
        });
});

// Create File
fileRoutes.route("/files").post(upload.single('file'),(request, response) => {
    console.log(request)
    let db_connect = dbo.getDb();
    let myobj = {
        title: request.body.data.title,
        dateUploaded: request.body.data.dateUploaded,
        size: request.body.data.size,
        type: request.body.data.type,
        content: request.file.buffer,
        uploadedBy: request.body.data.uploadedBy
    };

    db_connect.collection("Files")
        .insertOne(myobj, (err, result) => {
            if (err) throw err;
            response.json(result);
        });
});

// Create AWS File
fileRoutes.route("/awsfiles").post(upload.single('file'),async (request, response) => {
    let db_connect = dbo.getDb();
    let awsFileId = await aws.uploadFile(request.file.buffer)
    let myobj = {
        title: request.data.body.title,
        dateUploaded: request.data.body.dateUploaded,
        size: request.data.body.size,
        type: request.data.body.bodytype,
        content: awsFileId,
        uploadedBy: request.data.body.uploadedBy
    };

    db_connect.collection("Files")
        .insertOne(myobj, (err, result) => {
            if (err) throw err;
            response.json(result);
        });
});

// Delete File
fileRoutes.route("/files/:id").delete((request, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(request.params.id) };
    db_connect.collection("Files")
        .deleteOne(myquery,(err, result) => {
            if (err) throw err;
            console.log("1 document deleted");
            response.json(result);
        });
});

module.exports = fileRoutes