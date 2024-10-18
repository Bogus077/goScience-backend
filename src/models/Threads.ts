import { sequelize } from '../database/database.config';
import {
  CreationOptional,
  DataTypes as Sequelize,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { User } from './User';
import { Notifications } from './Notifications';

export class Threads extends Model<
  InferAttributes<Threads>,
  InferCreationAttributes<Threads>
> {
  declare id: CreationOptional<number>;
  declare UserId: ForeignKey<User['id']>;
  declare threadId: CreationOptional<string>;
  declare isDeleted: CreationOptional<boolean | null>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Threads.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
    threadId: {
      type: Sequelize.STRING,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    tableName: 'Threads',
  }
);
