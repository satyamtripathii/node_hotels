const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');



const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000

// middleware function
const logRequest = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // move on the next phase
}

// use of middleware in whole 
app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false}) 

app.get('/', function (req, res) {
  res.send('Welome to Our hotel ... How Can I Help You ?')
})




// import router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const Person = require('./models/person');

// use router files
app.use('/person', personRoutes);
app.use('/menu',  menuItemRoutes);


// start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

