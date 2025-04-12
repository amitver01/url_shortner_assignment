const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB=require('./config/db.js')
const urlRoutes = require('./routes/urlRoutes.js');


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/url', urlRoutes);
app.use('/', urlRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
