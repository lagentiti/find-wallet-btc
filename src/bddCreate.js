const config = require('../config.js'); // Import the configuration file that contains database settings
const { MongoClient } = require('mongodb'); // Import the MongoDB client for interacting with the database

module.exports = (data) => { 
  // Export a function that inserts a new document into a MongoDB collection
  const client = new MongoClient(config.bdd.client); 
  // Create a new MongoDB client using the connection string from the configuration

  client.connect(); 
  // Connect to the MongoDB database server

  const database = client.db(config.bdd.bdd); 
  // Access the specific database as defined in the configuration file

  const collection = database.collection(config.bdd.collection); 
  // Access the specific collection within the database as defined in the configuration

  const nouvelleDonnee = { token: data }; 
  // Create a new object containing the token data to be inserted

  collection.insertOne(nouvelleDonnee); 
  // Insert the new object into the collection as a document
};