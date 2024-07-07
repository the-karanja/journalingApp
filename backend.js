const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const secretKey = 'journaling2024'; // Replace with your secret key

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

// Session Configuration
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 minute for demonstration
}));

// Registration Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, hashedPassword], (error, results) => {
    if (error) {
      console.error('Error inserting user into database: ' + error.stack);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Check credentials in MySQL
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], async (error, results) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Store user information in session
    req.session.userId = results[0].id;
    req.session.username = results[0].username;

    res.status(200).json({ message: 'Login successful' });
  });
});

// this endpoint is used to post data from the app to mysql database
app.post('/journal_entries', (req, res) => {
    const { title, content, category } = req.body;
  
    // Validate input
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
  
    // Insert journal entry into database
    const query = 'INSERT INTO journal_entries (title, content, category) VALUES (?, ?, ?)';
    connection.query(query, [title, content, category], (error, results) => {
      if (error) {
        console.error('Error inserting journal entry into database: ' + error.stack);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.status(201).json({ message: 'Journal entry created successfully', entryId: results.insertId });
    });
  });

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

// Protected Route Example
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.session.username}!` });
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
