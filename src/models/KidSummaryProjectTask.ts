const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const KidSummaryProjectTask = sequelize.define(
  'KidSummaryProjectTask',
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
    label: {
      type: Sequelize.STRING,
    },
    points: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    dayStatus: {
      type: Sequelize.BOOLEAN,
    },
    weekStatus: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
