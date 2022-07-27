const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const UserSettings = sequelize.define(
  'UserSettings',
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
      unique: true,
    },
    ClassId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Class',
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
