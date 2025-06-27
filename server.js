const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// const newspectsRoutes = require('./routes/newspectsRoutes');
// const oldspectsRoutes = require('./routes/oldspectsRoutes');
// const newlensRoutes = require('./routes/newlensRoutes');
// const oldlensRoutes = require('./routes/oldlensRoutes');
const spectsSearchRoutes = require('./routes/spectsSearchRoutes');
// const lensSearchRoutes = require('./routes/lensSearchRoutes');
// const datewiseSearchRoutes = require('./routes/datewiseSearchRoutes');
// // const quoteRoutes = require('./routes/quoteRoutes');
// const authentication = require('./routes/AuthenticationRoutes');
// const frameRoutes = require('./routes/FrameRoutes');
// const fetchProdDetailsRoutes = require('./routes/fetchProdDetailsRoutes');



const app = express();
// const port = process.env.PORT;
const port = 3000;
let isDbConnected = false;



app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static("public"));
app.use(cors({ origin: 'https://pecc-admin.netlify.app' }));
// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: false }));

const newDbString = process.env.MONGODB_NEWDB_STRING;
const oldDbString = process.env.MONGODB_OLDDB_STRING;

mongoose.connect(newDbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
}).then(() => {
  console.log('Connected to New Database by Secondary Server');
  isDbConnected = true;
  app.get('/isDbConnected', async (req, res) => {
    res.status(200).json({ message: 'Database Connected by Secondary Server.' });
  });
}).catch((error) => {
  console.error('Error connecting to New Database:', error);
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Secondary Server is Running.' });
});

// // app.use('/api', quoteRoutes);
// app.use('/api', newspectsRoutes);
// app.use('/api', oldspectsRoutes);
// app.use('/api', newlensRoutes);
// app.use('/api', oldlensRoutes);
app.use('/api', spectsSearchRoutes);
// app.use('/api', lensSearchRoutes);
// app.use('/api', datewiseSearchRoutes);
// app.use('/api', authentication);
// app.use('/api', frameRoutes);
// app.use('/api', fetchProdDetailsRoutes);

// app.post('/api/customers/lens', (req, res) => {
//   try {
//     const temp = req.body;
//     console.log("Received Data for Lens:");
//     console.log(temp);
//     console.log("Name:", temp.name);
//     console.log("Phone1:", temp.phone1);
//     console.log("Date", temp.lastVisited);
//     console.log(temp.leDia);

//     res.status(201).json({ message: 'Data received successfully!' }); 
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Error receiving data.' }); 
//   }
// });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});