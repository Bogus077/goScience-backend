import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";

export class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare startAddress: string;
  declare finishAddress: string;
  declare createdBy: ForeignKey<User['id']>;
  declare orderDate: Date;
  declare orderNumber: CreationOptional<number>;
  declare startDate: Date;
  declare isDeleted: CreationOptional<boolean | null>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Event.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
    },
    startAddress: {
      type: Sequelize.STRING,
    },
    finishAddress: {
      type: Sequelize.STRING,
    },
    createdBy: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      unique: false,
    },
    orderDate: {
      type: Sequelize.DATE
    },
    orderNumber: {
      type: Sequelize.INTEGER
    },
    startDate: {
      type: Sequelize.DATE
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
    sequelize,
    tableName: 'Event'
  }
)
