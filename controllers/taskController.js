const taskModel = require('../models/taskModel');

const createTask = (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.userId;  // Extract userId from the token (middleware)

  taskModel.createTask({ title, description, status }, userId)
    .then(newTask => {
      res.status(201).json({
        message: 'Task created successfully!',
        task: newTask
      });
    })
    .catch(err => {
      console.error('Error creating task:', err);
      res.status(500).json({
        message: 'Error creating task',
        error: err
      });
    });
};


const getTasks = (req, res) => {
  const userId = req.userId; 

  taskModel.getTasksByUser(userId)
    .then(tasks => {
      res.status(200).json({ tasks });
    })
    .catch(err => res.status(500).json({ message: 'Error retrieving tasks', error: err }));
};

const updateTask = (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;

  taskModel.updateTask(taskId, { title, description, status })
    .then(updatedTask => {
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    })
    .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
};

const deleteTask = (req, res) => {
  const { taskId } = req.params;

  taskModel.deleteTask(taskId)
    .then(deletedTask => {
      res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting task', error: err }));
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
