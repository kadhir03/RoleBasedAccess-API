//authController.js

const bcrypt = require('bcryptjs');
const { generateToken } = require('./authService');
const User = require('../users/userService');
const Role = require('../roles/roleService');


const register = async (req, res) => {
    try {
        const { username, password, roleId } = req.body;

        // Validación de campos requeridos
        if (!username || !password || !roleId) {
            return res.status(400).send({ message: 'Username, password, and role ID are required.' });
        }

        // Validación de existencia del rol
        const role = await Role.getRoleById(roleId);
        if (!role) {
            return res.status(404).send({ message: 'Role not found.' });
        }

        // Verificación de que el nombre de usuario no esté repetido
        const existingUsers = await User.getAllUsers();
        const existingUser = existingUsers.find(user => user.username === username);
        if (existingUser) {
            return res.status(409).send({ message: 'Username already exists.' }); // 409 Conflict
        }

        // Creación del nuevo usuario
        const newUser = { username, password, roleId };
        const user = await User.addUser(newUser);

        // Generación del token JWT
        const token = generateToken(user);
        res.status(201).send({ auth: true, token });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user.', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await User.getAllUsers(); // Esperar a obtener todos los usuarios
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const token = generateToken(user);
        res.status(200).send({ auth: true, token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in.', error: error.message });
    }
};

module.exports = { register, login };
