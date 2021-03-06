const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const User = sequelize.define(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    phone: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
