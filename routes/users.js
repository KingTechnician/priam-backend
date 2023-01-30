
var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

//Print environment variables

var MongoClient = mongodb.MongoClient;
var url = process.env.ATLASURI


MongoClient.connect(url,function(err,db)
{
  console.log("MongoDB Server Connected")
})

/* GET users listing. */
router.all('/', (req,res) => 
{
  query = req.body.query
  category = req.body.category
  searchDictionary = {category:{ $regex:".*"+category+".*"}}
  MongoClient.connect(url,{useNewUrlParser:true},(err,client) => 
{
    if(err) throw err;
    const db = client.db("changeWorthy");

    db.collection("onlinePosts").find({}).toArray().then((docs)=>
    {
      foundDocs = []
        docs.forEach((doc) =>
        {
          if(doc.title.includes(query))
          {
            foundDocs.push(doc)
          }
        })
        res.send(foundDocs)
    })
})
})

module.exports = router;
