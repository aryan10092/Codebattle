const mongoose = require("mongoose");

async function connectDatabase(connectionString) {
  if (!connectionString) {
    throw new Error("MONGODB_URI is not set");

    
  }

     await mongoose.connect(connectionString);
  console.log("Connected to MongoDB");
}

module.exports = {
  connectDatabase,
};