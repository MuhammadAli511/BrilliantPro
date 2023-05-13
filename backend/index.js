const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT
const routes = require('./routes/index')
const cors = require('cors');

connectDB()

const app = express()

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json())

app.use('/api', routes)

app.listen(port, () => console.log(`Server running on port ${port}`))
