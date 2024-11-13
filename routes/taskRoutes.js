const express = require('express');
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, taskController.createTask);
router.get('/', verifyToken, taskController.getTasks);
router.put('/:taskId', verifyToken, taskController.updateTask);
router.delete('/:taskId', verifyToken, taskController.deleteTask);

module.exports = router;
