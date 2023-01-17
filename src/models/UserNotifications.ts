const { sequelize } = require('../database/database.config');
import { DataTypes as Sequelize } from "sequelize";

export const UserNotifications = sequelize.define(
  'UserNotifications',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
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
    NotificationId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Notifications',
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
