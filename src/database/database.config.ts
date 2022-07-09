const { Sequelize } = require('sequelize');
const { dbconn } = require('../config/config');
export const sequelize = new Sequelize(dbconn);

// db sync
// async function syncTable() {
//   await sequelize.sync();
//   console.log('All models were synchronized successfully.');
// }

// syncTable();
