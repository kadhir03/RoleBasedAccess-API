const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');
const { User } = require('../users/userModel');  // Importamos el modelo de usuario

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {  // Campo 'name' cambiado a 'title'
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,  // Asegúrate de que allowNull está en false si siempre quieres un valor
        defaultValue: DataTypes.NOW // Esto establece la fecha y hora actuales por defecto
    },
    status: {  // Cambiado a booleano
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Por defecto, 'false' indica que la tarea no está completada
    },
    createdBy: {  // Referencia al ID del usuario que crea la tarea
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    assignedTo: {  // Referencia al ID del usuario asignado a la tarea
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    state: {  // Campo 'state' para los estados como 'pendiente', 'completado'
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente' // Por defecto, 'pendiente'
    },
}, {
    timestamps: true, // Habilita createdAt y updatedAt si son necesarios
    freezeTableName: true,
    returning: true,
    tableName: 'tasks' // Nombre de la tabla en la base de datos
});


module.exports = {
    Task
};
