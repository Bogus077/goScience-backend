const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const Kid = sequelize.define(
  'Kid',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING,
      unique: true,
    },
    ClassId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Class',
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
