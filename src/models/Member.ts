const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const Member = sequelize.define(
  'Member',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
    dob: {
      allowNull: true,
      type: Sequelize.DATE
    },
    sex: {
      type: Sequelize.STRING,
    },
    plat: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: false,
    },
    password: {
      type: Sequelize.STRING,
      unique: false,
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
