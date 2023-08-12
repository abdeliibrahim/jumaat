const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config
const mosqueRoutes = require('./routes/mosques')

app.use(express.json());

//Connect mongo database

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
//app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/mosques', mosqueRoutes)

const port = process.env.PORT || 4000;
connectDB().then(() => {
app.listen(port, () => console.log(`Server running on port ${port}`))
})