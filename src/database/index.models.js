
// src/models/model.index.js


const { Role } = require('../roles/roleModel');
const { User } = require('../users/userModel');
const { Task } = require('../tasks/taskModel');

const syncModels = async () => {
  try {
    await Role.sync();
    await User.sync();
    await Task.sync();
    
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
};

module.exports = syncModels;

