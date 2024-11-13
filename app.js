const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT || 5000;

const dbPath = path.resolve(__dirname, 'config', 'database.db');

if (!fs.existsSync(dbPath)) {
  console.log('Database file not found. Creating the database...');
  
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error creating database:', err);
    } else {
      console.log('Database file created');
    }
  });

  const schemaPath = path.join(__dirname, 'config', 'schema.sql');
  fs.readFile(schemaPath, 'utf8', (err, schema) => {
    if (err) {
      console.error('Error reading schema.sql:', err);
      return;
    }

    db.exec(schema, (err) => {
      if (err) {
        console.error('Error executing schema:', err);
      } else {
        console.log('Database schema created successfully!');
      }
    });
  });
} else {
  console.log('Database file already exists');
}

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
