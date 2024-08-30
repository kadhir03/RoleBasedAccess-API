//taskController.js

const TaskService = require('./taskService');
const UserService  = require('../users/userService');

module.exports = {
    async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            tasks.forEach(task => {
                if (task.dueDate) {
                    const date = new Date(task.dueDate);
                    task.dueDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                }
            });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
        }
    },

    async getTaskById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid task ID' });
            }
            const task = await TaskService.getTaskById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            if (task.dueDate) {
                const date = new Date(task.dueDate);
                task.dueDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving task', error: error.message });
        }
    },

    async addTask(req, res) {
        try {
            const { title, description, status, assignedTo, state, dueDate } = req.body;
            
            if (!title || typeof status !== 'boolean' || !['pendiente', 'en proceso', 'finalizada'].includes(state)) {
                return res.status(400).json({ message: 'Invalid task data' });
            }
    
            const assignedUser = await UserService.getUserById(assignedTo);
            if (assignedTo && !assignedUser) {
                return res.status(404).json({ message: 'Assigned user not found' });
            }
    
            const newTask = {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : new Date(), // Asegurarse de que dueDate se asigne correctamente
                status,
                createdBy: req.user.id,
                assignedTo,
                state,
            };
    
            const task = await TaskService.addTask(newTask);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error adding task', error: error.message });
        }
    },

    async updateTask(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid task ID' });
            }
            const { title, description, dueDate, status, assignedTo, state } = req.body;
            if (!title || typeof status !== 'boolean' || !['pendiente', 'en proceso', 'finalizada'].includes(state)) {
                return res.status(400).json({ message: 'Invalid task data' });
            }
    
            const assignedUser = await UserService.getUserById(assignedTo);
            if (assignedTo && !assignedUser) {
                return res.status(404).json({ message: 'Assigned user not found' });
            }
    
            let formattedDueDate;
            if (dueDate) {
                const [day, month, year] = dueDate.split('/').map(Number);
                formattedDueDate = new Date(year, month - 1, day);
                if (isNaN(formattedDueDate)) {
                    return res.status(400).json({ message: 'Invalid due date' });
                }
            }
    
            const updatedTask = {
                title,
                description,
                dueDate: formattedDueDate,
                status: state === 'finalizada' ? false : status,
                assignedTo,
                state
            };
    
            const task = await TaskService.updateTask(id, updatedTask);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            if (formattedDueDate) {
                task.dueDate = dueDate;
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error: error.message });
        }
    },

    async deleteTask(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid task ID' });
            }
            const task = await TaskService.deleteTask(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error: error.message });
        }
    }
};