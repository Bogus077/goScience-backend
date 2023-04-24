const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const MemberAttendance = sequelize.define(
  'MemberAttendance',
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
    type: {
      type: Sequelize.STRING,
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
