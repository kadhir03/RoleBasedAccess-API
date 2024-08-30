//roleController.js

const RoleService  = require('./roleService');

module.exports = {
    async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving roles', error: error.message });
        }
    },

    async getRoleById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid role ID' });
            }
            const role = await RoleService.getRoleById(id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving role', error: error.message });
        }
    },

    async addRole(req, res) {
        try {
            const { name, status } = req.body;
            if (!name || typeof status !== 'boolean') {
                return res.status(400).json({ message: 'Invalid role data' });
            }
            // Check if the role name already exists
            const existingRole = await RoleService.getAllRoles().then(roles =>
                roles.find(role => role.name === name)
            );
            if (existingRole) {
                return res.status(400).json({ message: 'Role name already exists' });
            }

            const newRole = { name, status };
            const role = await RoleService.addRole(newRole);
            res.status(201).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error adding role', error: error.message });
        }
    },

    async updateRole(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid role ID' });
            }
            const { name, status } = req.body;
            if (!name || typeof status !== 'boolean') {
                return res.status(400).json({ message: 'Invalid role data' });
            }

            // Check if the role name already exists and is not the name of the role being updated
            const existingRole = await RoleService.getAllRoles().then(roles =>
                roles.find(role => role.name === name && role.id !== id)
            );
            if (existingRole) {
                return res.status(400).json({ message: 'Role name already exists' });
            }

            const updatedRole = { name, status };
            const role = await RoleService.updateRole(id, updatedRole);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error updating role', error: error.message });
        }
    },

    async deleteRole(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid role ID' });
            }
            const role = await RoleService.deleteRole(id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
    }
};