const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const Role = sequelize.define(
  'Role',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
