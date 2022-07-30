const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const TasksMonth = sequelize.define(
  'TasksMonth',
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
    TasksQuarterId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'TasksQuarter',
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
