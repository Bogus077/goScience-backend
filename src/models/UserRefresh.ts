const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const UserRefresh = sequelize.define(
  'UserRefresh',
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
    refresh: {
      type: Sequelize.STRING
    },
    used: {
      type: Sequelize.BOOLEAN
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
