const mongoose = require('mongoose');
const { SERVER } = require("../../../../config")

  const connectToMongoDB = () => {
    mongoose.connect(SERVER);
      
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Connected to MongoDB'));
  }

module.exports = connectToMongoDB;