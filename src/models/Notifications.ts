const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const Notifications = sequelize.define(
  'Notifications',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
    type: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
