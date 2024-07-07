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

  app.post('/register', (req, res) => {
    username = req.body.username; // username dump from json data sent to server
    email = req.body.email; // email dump from json data sent to server
    password = req.body.password; // password dump from json data sent to server

      // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert the user data into MySQL
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (error, results) => {
    if (error) {
      console.error('Error inserting data: ' + error.stack);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User added successfully', userId: results.insertId });
  });

  });

  

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});