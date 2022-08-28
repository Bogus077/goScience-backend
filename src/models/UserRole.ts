const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const UserRole = sequelize.define(
  'UserRole',
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
    RoleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Role',
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
