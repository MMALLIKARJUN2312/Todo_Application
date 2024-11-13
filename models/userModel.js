const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { name, email, password } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuidv4();  
    const query = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
    
    db.run(query, [userId, name, email, hashedPassword], function (err) {
      if (err) {
        return reject(err);  
      }
      resolve({ id: userId, name, email });  
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.get(query, [email], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name, email FROM users WHERE id = ?';
    db.get(query, [userId], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

const updateUser = (userId, updatedData) => {
  return new Promise((resolve, reject) => {
    const { name, email, password } = updatedData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.run(query, [name, email, hashedPassword, userId], function (err) {
      if (err) reject(err);
      resolve({ id: userId, name, email });
    });
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserById,
  updateUser,
};
