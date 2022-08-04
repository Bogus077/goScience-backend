const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const KidTeam = sequelize.define(
  'KidTeam',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    KidId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Kid',
        key: 'id',
      },
      unique: false,
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
