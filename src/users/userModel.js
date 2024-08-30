// src/models/user
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');
const { Role } = require('../roles/roleModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role, // Use the imported Role model
      key: 'id',
    },
  }
},{
  timestamps: true, // Enable createdAt and updatedAt (if needed)
  freezeTableName: true,
  tableName: 'users'
});

module.exports = {
    User
};
