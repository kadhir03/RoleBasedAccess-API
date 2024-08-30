//taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('./taskController');
const { verifyToken } = require('../auth/authService');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: A detailed description of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the task
 *         status:
 *           type: boolean
 *           description: The status of the task (completed or not)
 *         createdBy:
 *           type: integer
 *           description: The ID of the user who created the task
 *         assignedTo:
 *           type: integer
 *           description: The ID of the user to whom the task is assigned
 *         state:
 *           type: string
 *           description: The current state of the task (e.g., "pending", "in progress", "completed")
 *       required:
 *         - title
 *         - dueDate
 *         - status
 *         - createdBy
 *         - assignedTo
 *         - state
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of all tasks
 *     tags: 
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     tags: 
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: A single task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: 
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             title: "New Task"
 *             description: "Detailed description of the task"
 *             dueDate: "2024-08-12T00:00:00Z"
 *             status: true
 *             createdBy: 1
 *             assignedTo: 2
 *             state: "pending"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/', verifyToken,taskController.addTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update a task by ID
 *     tags: 
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             title: "Updated Task"
 *             description: "Updated description"
 *             dueDate: "2024-09-12T00:00:00Z"
 *             status: false
 *             assignedTo: 3
 *             state: "in progress"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.patch('/:id', verifyToken, taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: 
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.delete('/:id', verifyToken, taskController.deleteTask);

module.exports = router;
