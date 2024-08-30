// authService.js
// authService.js

require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username, roleId: user.roleId }, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).send({ message: 'Invalid token format.' });
    }
    jwt.verify(tokenParts[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.user = { id: decoded.id, username: decoded.username, roleId: decoded.roleId };
        next();
    });
}

// Middleware para verificar el rol del usuario
function checkRole(requiredRoleId) {
    return (req, res, next) => {
        if (Number(req.user.roleId) !== Number(requiredRoleId)) {
            return res.status(403).send({ message: 'Access denied. Insufficient role.' });
        }
        next();
    };
}

module.exports = { generateToken, verifyToken, checkRole };
