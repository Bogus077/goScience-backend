import { sequelize } from '../database/database.config';
import { Association, CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { Member } from './Member';

export class MemberContact extends Model<InferAttributes<MemberContact>, InferCreationAttributes<MemberContact>> {
  declare id: CreationOptional<number>;
  declare MemberId: ForeignKey<Member['id']>;
  declare name: string;
  declare phone: string;
  declare address: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

MemberContact.init(
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
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
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
    sequelize,
    tableName: 'MemberContact'
  }
)
