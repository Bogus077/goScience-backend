import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";
import { Notifications } from './Notifications';

export class UserNotifications extends Model<InferAttributes<UserNotifications>, InferCreationAttributes<UserNotifications>> {
  declare id: CreationOptional<number>;
  declare UserId: ForeignKey<User['id']>;
  declare NotificationId: ForeignKey<Notifications['id']>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

UserNotifications.init(
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
    sequelize,
    tableName: 'UserNotifications'
  }
)
