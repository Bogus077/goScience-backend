import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";
import { Member } from './Member';
import { Event } from './Event';

export class EventMember extends Model<InferAttributes<EventMember>, InferCreationAttributes<EventMember>> {
  declare id: CreationOptional<number>;
  declare MemberId: ForeignKey<Member['id']>;
  declare EventId: ForeignKey<Event['id']>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

EventMember.init(
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
    tableName: 'EventMember'
  }
)
