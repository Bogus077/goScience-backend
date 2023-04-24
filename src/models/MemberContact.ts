const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const MemberContact = sequelize.define(
  'MemberContact',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    MemberId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Member',
        key: 'id',
      },
      unique: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
