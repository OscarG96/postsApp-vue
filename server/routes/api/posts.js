const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();


//Get posts
router.get("/", async (req, res) => {
    // res.send("Hello world");
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})


//Add posts
router.post("/", async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//delete post
router.delete("/:id", async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
})

// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://OscarG96:180496@<hostname>/Cluster0?ssl=true&replicaSet=atlas-shu5z9-shard-0&authSource=admin&retryWrites=true&w=majority";

// MongoClient.connect(uri, function(err, client) {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://OscarG96:180496@cluster0.sq5jq.mongodb.net/Cluster0?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });
        return client.db("Cluster0").collection("posts")
}

module.exports = router