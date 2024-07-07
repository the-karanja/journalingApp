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


// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'transactions', // Replace with your database name
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
  });
  
  // Example route to test MySQL connection
  app.get('/', (req, res) => {
    connection.query('SELECT * FROM banktransactions', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error querying database' });
        return;
      }
      res.json(results);
    });
  });

  

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});