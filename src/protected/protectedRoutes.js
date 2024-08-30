// protectedRoutes.js

// protectedRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../auth/authService');

/**
 * @swagger
 * /api/protected/admin:
 *   get:
 *     summary: Admin protected route
 *     description: Accessible only by users with the admin role.
 *     tags:
 *       - Protected
 *     responses:
 *       200:
 *         description: Welcome, Admin!
 *       403:
 *         description: Access denied. Insufficient role.
 */
router.get('/admin', verifyToken, checkRole(1), (req, res) => {  // Suponiendo que '1' es el roleId para 'admin'
    res.status(200).send({ message: `Welcome, Admin ${req.user.username}!` });
});

/**
 * @swagger
 * /api/protected/user:
 *   get:
 *     summary: User protected route
 *     description: Accessible by all authenticated users.
 *     tags:
 *       - Protected
 *     responses:
 *       200:
 *         description: Welcome, User!
 *       403:
 *         description: Access denied. Insufficient role.
 */
router.get('/user', verifyToken, (req, res) => { 
    res.status(200).send({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
