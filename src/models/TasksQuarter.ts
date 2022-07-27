const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const TasksQuarter = sequelize.define(
  'TasksQuarter',
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
    description: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE,
    },
    points: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    TaskgroupId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Taskgroup',
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
