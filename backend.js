const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require("cors");
const mysql = require('mysql');  
const Encryption = require('./Encryption');
require('dotenv').config(); // Load .env variables

const app = express();
const port = 3000;


app.use(cors())
// enable parsing application/json
app.use(express.json());


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});