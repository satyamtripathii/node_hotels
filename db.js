const mongoose = require('mongoose');

// define the MongoDB connection URL
const MongoURL = 'mongodb://localhost:27017/hotels';

//set up Mongodb url
mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

//get the default connection
const db = mongoose.connection;

//define event listeners for the connection
db.on('connected', () => {
  console.log('connected to mongodb Server');
});

db.on('error', (err) => {
  console.log('Error in DB connection: ', err);
});

db.on('disconnected', () => {
  console.log('Mongodb disconnected');
});

// export the databse connection
module.exports = db;