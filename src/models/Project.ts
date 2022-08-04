const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const Project = sequelize.define(
  'Project',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    TeamId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Team',
        key: 'id',
      },
      unique: false,
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
    label: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
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
