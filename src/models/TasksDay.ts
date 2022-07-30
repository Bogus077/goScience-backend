const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const TasksDay = sequelize.define(
  'TasksDay',
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
    KidId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Kid',
        key: 'id',
      },
      unique: false,
    },
    TasksWeekId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'TasksWeek',
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
