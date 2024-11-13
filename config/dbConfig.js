require('dotenv').config();  
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'database.db');  


const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err);
  } else {
    console.log('Successfully connected to the SQLite database');
  }
});

module.exports = db;
