const { sequelize } = require('../database/database.config');
import { DataTypes } from "sequelize";

export const TeamKid = sequelize.define(
  'TeamKid',
  {
    team_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      unique: false,
    },
    kid_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'AvailableKid',
        key: 'id',
      },
      unique: true,
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
