const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./Schema');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password, roles, profile } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Validation error: All fields are required' });
    }

    const newUser = new User({ username, email, password, roles, profile });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
