
// src/models/model.index.js


const { Role } = require('../roles/roleModel');
const { User } = require('../users/userModel');
const { Task } = require('../tasks/taskModel');

const syncModels = async (sequelize) => {
  try {
    const isSynced = await sequelize.query("SELECT 1 FROM SequelizeMeta LIMIT 1;")
      .then(() => true)
      .catch(() => false);

    if (!isSynced) {
      await Role.sync();
      await User.sync();
      await Task.sync();
      console.log('Tables created successfully.');
    } else {
      console.log('Tables are already synced.');
    }
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
};


module.exports = syncModels;

