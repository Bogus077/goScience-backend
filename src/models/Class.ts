const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const Class = sequelize.define(
  'Class',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    label: {
      type: Sequelize.STRING
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
