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
      defaultValue: 0,
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
