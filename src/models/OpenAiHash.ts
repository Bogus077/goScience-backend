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

export class OpenAiHash extends Model<
  InferAttributes<OpenAiHash>,
  InferCreationAttributes<OpenAiHash>
> {
  declare id: CreationOptional<number>;
  declare UserId: ForeignKey<User['id']>;
  declare hash: CreationOptional<string>;
  declare response: CreationOptional<string>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

OpenAiHash.init(
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
    hash: {
      type: Sequelize.STRING,
    },
    response: {
      type: Sequelize.TEXT,
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
    tableName: 'OpenAiHash',
  }
);
