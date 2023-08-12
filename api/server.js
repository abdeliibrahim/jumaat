const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

app.use(express.json());

//Connect mongo database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`))