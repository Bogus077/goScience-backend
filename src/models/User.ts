const { sequelize } = require('../database/database.config');
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  'User',
  {
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.INTEGER },
    exp: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    morality: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
