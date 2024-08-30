// src/models/role
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
 status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'roles',
});

module.exports = {
  Role
};


