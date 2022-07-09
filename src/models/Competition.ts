const { sequelize } = require('../database/database.config');
import { DataTypes } from "sequelize";

export const Competition = sequelize.define(
  'Competition',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dateStart: {
      allowNull: false,
      type: DataTypes.DATE
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
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
    winner: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },      
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
