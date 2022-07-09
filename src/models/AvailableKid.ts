const { sequelize } = require('../database/database.config');
import { DataTypes } from "sequelize";

export const AvailableKid = sequelize.define(
  'AvailableKid',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.INTEGER
    },
    strength: {
      type: DataTypes.INTEGER
    },
    agility: {
      type: DataTypes.INTEGER
    },
    accuracy: {
      type: DataTypes.INTEGER
    },
    intellect: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
