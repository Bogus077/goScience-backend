const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const StatsTask = sequelize.define(
  'StatsTask',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      unique: false,
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
    TasksDayId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'TasksDay',
        key: 'id',
      },
      unique: false,
    },
    points: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: Sequelize.BOOLEAN
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
