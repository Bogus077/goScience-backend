const { sequelize } = require('../database/database.config');
import { DataTypes } from "sequelize";

export const CompetitionApplication = sequelize.define(
  'CompetitionApplication',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    competition_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Competition',
        key: 'id',
      },
      unique: false,
    },
    team_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      unique: false,
    },
    result: {
      type: DataTypes.STRING
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
