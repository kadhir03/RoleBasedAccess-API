const { Role } = require('./roleModel');

module.exports = {
    async getAllRoles() {
        try {
            return await Role.findAll(); // Obtiene todos los roles
        } catch (error) {
            console.error('Error fetching all roles:', error);
            throw error;
        }
    },

    async getRoleById(id) {
        try {
            return await Role.findByPk(id); // Busca un rol por su ID
        } catch (error) {
            console.error(`Error fetching role with ID ${id}:`, error);
            throw error;
        }
    },

    async addRole(roleData) {
        try {
            return await Role.create(roleData); // Crea un nuevo rol
        } catch (error) {
            console.error('Error creating role:', error);
            throw error;
        }
    },

    async updateRole(id, updatedRoleData) {
        try {
            const role = await Role.findByPk(id);
            if (!role) {
                throw new Error('Role not found');
            }

            return await role.update(updatedRoleData); // Actualiza el rol existente
        } catch (error) {
            console.error(`Error updating role with ID ${id}:`, error);
            throw error;
        }
    },

    async deleteRole(id) {
        try {
            const role = await Role.findByPk(id);
            if (!role) {
                throw new Error('Role not found');
            }

            return await role.destroy(); // Elimina el rol
        } catch (error) {
            console.error(`Error deleting role with ID ${id}:`, error);
            throw error;
        }
    }
};