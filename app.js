const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connect URL
const url = 'mongodb://localhost:27017';

// database name
const dbName = 'myproject';

// use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);



const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.updateOne({ a : 2 }
        , { $set: { b : 1 } }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
  
      console.log("updated the document with the field a equal to 2");
      callback(result);
    });
  }
  

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({'a':3}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }


  const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
      , { $set: { b : 1 } }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
      callback(result);
    });  
  }


  const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });    
  }


  insertDocuments(db, function() {
    indexCollection(db, function() {
      client.close();
    });
  });
});   


const indexCollection = function(db, callback) {
    db.collection('documents').createIndex(
      { "a": 1 },
        null,
        function(err, results) {
          console.log(results);
          callback();
      }
    );
  };