import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Member } from './Member';

export class MemberAttendance extends Model<InferAttributes<MemberAttendance>, InferCreationAttributes<MemberAttendance>> {
  declare id: CreationOptional<number>;
  declare MemberId: ForeignKey<Member['id']>;
  declare type: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

MemberAttendance.init(
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
    type: {
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
    tableName: 'MemberAttendance'
  }
)
