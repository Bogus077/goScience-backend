const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const ProjectTask = sequelize.define(
  'ProjectTask',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ProjectId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Project',
        key: 'id',
      },
      unique: false,
    },
    label: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    points: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
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
