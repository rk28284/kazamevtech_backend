const TaskModel = require("../model/task.model");

const createTask = async (req, res) => {
    console.log("klngkdfl");
    
    const { title, description } = req.body;
    const task = new TaskModel({ userId: req.user.id, title, description });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

const updateTask = async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

const deleteTask = async (req, res) => {
    try {
        await TaskModel.findByIdAndDelete(req.params.id);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
