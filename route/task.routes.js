const express = require('express');
const authentication = require('../middleware/auth.middleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller'); // ✅ Correct Import

const taskRouter = express.Router();
taskRouter.use(authentication);
taskRouter.post('/task/add', createTask);
taskRouter.get('/task', getTasks);
taskRouter.put('/task/:id', updateTask);
taskRouter.delete('/task/:id', deleteTask);

module.exports = taskRouter;
