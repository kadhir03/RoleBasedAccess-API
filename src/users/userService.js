//userService.js

const bcrypt = require('bcryptjs');
const { User } = require('./userModel'); // Importa el modelo de usuario

module.exports = {
    async getAllUsers() {
        try {
            return await User.findAll(); // Obtiene todos los usuarios
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    },

    async getUserById(id) {
        try {
            return await User.findByPk(id); // Busca un usuario por su ID
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw error;
        }
    },

    async addUser(userData) {
        try {
            userData.password = bcrypt.hashSync(userData.password, 8); // Encripta la contraseña
            return await User.create(userData); // Crea un nuevo usuario
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    async updateUser(id, updatedUserData) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }

            updatedUserData.password = bcrypt.hashSync(updatedUserData.password, 8); // Encripta la nueva contraseña
            return await user.update(updatedUserData); // Actualiza el usuario existente
        } catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
            throw error;
        }
    },

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }

            return await user.destroy(); // Elimina el usuario
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw error;
        }
    }
};