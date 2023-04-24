const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const Teacher = sequelize.define(
  'Teacher',
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
    middlename: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
