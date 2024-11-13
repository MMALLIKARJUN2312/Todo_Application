const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;
const userModel = require('../models/userModel');

const signup = (req, res) => {
  const { name, email, password } = req.body;
  
  userModel.findUserByEmail(email)
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists!' });
      }
      
      userModel.createUser({ name, email, password })
        .then(newUser => {
          res.status(201).json({ message: 'User created successfully!', user: newUser });
        })
        .catch(err => res.status(500).json({ message: 'Error creating user', error: err }));
    })
    .catch(err => res.status(500).json({ message: 'Error checking user existence', error: err }));
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password!' });
      }
      
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    })
    .catch(err => res.status(500).json({ message: 'Error logging in', error: err }));
};

module.exports = {
  signup,
  login
};
