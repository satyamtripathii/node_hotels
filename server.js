const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send('welome to my hotel ... how can i help you ?')
})




// import router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use router files
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


// start the server
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

