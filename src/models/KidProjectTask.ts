const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const KidProjectTask = sequelize.define(
  'KidProjectTask',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    KidId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Kid',
        key: 'id',
      },
      unique: false,
    },
    ProjectTaskId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'ProjectTask',
        key: 'id',
      },
      unique: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
