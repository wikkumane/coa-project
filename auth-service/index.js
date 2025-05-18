const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || '784743578354798453978354978534978534978';
console.log('JWT_SECRET is set:', !!JWT_SECRET); 

const users = [];

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    console.log(`User registered: ${username}`);
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {  
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send('Invalid credentials');
    }

    console.log(`Generating token for user: ${username}`);
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated successfully');
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
  console.log(`Environment variables loaded: PORT=${PORT}`);
});