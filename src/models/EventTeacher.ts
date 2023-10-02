import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Event } from './Event';
import { Teacher } from './Teacher';

export class EventTeacher extends Model<InferAttributes<EventTeacher>, InferCreationAttributes<EventTeacher>> {
  declare id: CreationOptional<number>;
  declare TeacherId: ForeignKey<Teacher['id']>;
  declare EventId: ForeignKey<Event['id']>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

EventTeacher.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    TeacherId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Teacher',
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
    tableName: 'EventTeacher'
  }
)
