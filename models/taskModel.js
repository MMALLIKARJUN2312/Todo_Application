const db = require('../config/dbConfig');

// Create a task
const createTask = (taskData, userId) => {
  return new Promise((resolve, reject) => {
    const { title, description, status } = taskData;
    const query = `INSERT INTO tasks (user_id, title, description, status) 
                   VALUES (?, ?, ?, ?)`;

    db.run(query, [userId, title, description, status], function (err) {
      if (err) {
        console.error('Error creating task:', err);
        reject(err);
      }
      resolve({ id: this.lastID, user_id: userId, title, description, status });
    });
  });
};

// Get tasks for a user
const getTasksByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    db.all(query, [userId], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

// Update a task
const updateTask = (taskId, updatedData) => {
  return new Promise((resolve, reject) => {
    const { title, description, status } = updatedData;
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    db.run(query, [title, description, status, taskId], function (err) {
      if (err) reject(err);
      resolve({ id: taskId, ...updatedData });
    });
  });
};

// Delete a task
const deleteTask = (taskId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [taskId], function (err) {
      if (err) reject(err);
      resolve({ id: taskId });
    });
  });
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
};
