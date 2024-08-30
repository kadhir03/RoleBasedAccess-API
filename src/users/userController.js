//userController.js

const UserService = require('./userService');
const RoleService = require('../roles/roleService');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error: error.message });
        }
    },

    async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error: error.message });
        }
    },

    async addUser(req, res) {
        try {
            const { username, password, roleId } = req.body;
            if (!username || !password || !roleId) {
                return res.status(400).json({ message: 'Invalid user data' });
            }
            const existingUser = await UserService.getAllUsers().then(users =>
                users.find(user => user.username === username)
            );
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const role = await RoleService.getRoleById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            const newUser = { username, password, roleId };
            const user = await UserService.addUser(newUser);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error adding user', error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const { username, password, roleId } = req.body;
            if (!username || !password || !roleId) {
                return res.status(400).json({ message: 'Invalid user data' });
            }
            const existingUser = await UserService.getAllUsers().then(users =>
                users.find(user => user.username === username && user.id !== id)
            );
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const role = await RoleService.getRoleById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            const updatedUser = { username, password, roleId };
            const user = await UserService.updateUser(id, updatedUser);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const user = await UserService.deleteUser(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
};