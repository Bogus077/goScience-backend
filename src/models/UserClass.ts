const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";
import { Class } from "./Class";
import { User } from "./User";

export const UserClass = sequelize.define(
  'UserClass',
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
