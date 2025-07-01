const config = require('../config.js'); // Import the configuration file for database credentials and settings
const { MongoClient } = require('mongodb'); // Import the MongoDB client

module.exports = (data) => { 
  // Export a function that interacts with a MongoDB database using the provided data as a token
  const client = new MongoClient(config.bdd.client); // Create a new MongoDB client using the connection string from the config
  client.connect(); // Establish a connection to the database

  const database = client.db(config.bdd.bdd); // Access the database specified in the config file
  const collection = database.collection(config.bdd.collection); // Access the collection specified in the config file
  const critere = { token: data }; // Define the search criteria, using 'data' as the token to look for
  const resultat = collection.findOne(critere); // Query the collection to find a document matching the criteria

  if (resultat) { 
    // If a matching document is found
    return 1; // Return 1 indicating the token exists in the database
  } else {
    // If no matching document is found
    return 0; // Return 0 indicating the token does not exist in the database
  };
};