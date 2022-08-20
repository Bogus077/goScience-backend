const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const KidSummaryUser = sequelize.define(
  'KidSummaryUser',
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
    dayStatus: {
      type: Sequelize.BOOLEAN,
    },
    weekStatus: {
      type: Sequelize.BOOLEAN,
    },
    type: {
      type: Sequelize.STRING,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
