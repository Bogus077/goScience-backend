import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";
import { Event } from './Event';

export class EventUser extends Model<InferAttributes<EventUser>, InferCreationAttributes<EventUser>> {
  declare id: CreationOptional<number>;
  declare UserId: ForeignKey<User['id']>;
  declare EventId: ForeignKey<Event['id']>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

EventUser.init(
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
    EventId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Event',
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
    tableName: 'EventUser'
  }
)
