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

export class Marks extends Model<
  InferAttributes<Marks>,
  InferCreationAttributes<Marks>
> {
  declare id: CreationOptional<number>;
  declare UserId: ForeignKey<User['id']>;
  declare marks: CreationOptional<string>;
  declare isDeleted: CreationOptional<boolean>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Marks.init(
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
    marks: {
      type: Sequelize.TEXT,
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
    tableName: 'Marks',
  }
);
