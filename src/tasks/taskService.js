//taskService.js

// src/services/taskService.js

const { Task } = require('./taskModel');

module.exports = {
    async getAllTasks() {
        try {
            return await Task.findAll(); // Obtiene todas las tareas
        } catch (error) {
            console.error('Error fetching all tasks:', error);
            throw error;
        }
    },

    async getTaskById(id) {
        try {
            return await Task.findByPk(id); // Busca una tarea por su ID
        } catch (error) {
            console.error(`Error fetching task with ID ${id}:`, error);
            throw error;
        }
    },

    async addTask(taskData) {
        try {
            return await Task.create(taskData); // Crea una nueva tarea
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    async updateTask(id, updatedTaskData) {
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error('Task not found');
            }

            return await task.update(updatedTaskData); // Actualiza la tarea existente
        } catch (error) {
            console.error(`Error updating task with ID ${id}:`, error);
            throw error;
        }
    },

    async deleteTask(id) {
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error('Task not found');
            }

            return await task.destroy(); // Elimina la tarea
        } catch (error) {
            console.error(`Error deleting task with ID ${id}:`, error);
            throw error;
        }
    }
};
