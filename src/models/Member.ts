import { sequelize } from '../database/database.config';
import { Association, CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";

export class Member extends Model<InferAttributes<Member>, InferCreationAttributes<Member>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare surname: string;
  declare middleName: string;
  declare dob: Date;
  declare sex: string;
  declare plat: number;
  declare status: string;
  declare email: string;
  declare password: string;
  declare position: string;
  declare allergy: string;
  declare isDeleted: CreationOptional<boolean | null>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Member.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
    middleName: {
      type: Sequelize.STRING,
    },
    dob: {
      allowNull: true,
      type: Sequelize.DATE
    },
    sex: {
      type: Sequelize.STRING,
    },
    plat: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: false,
    },
    password: {
      type: Sequelize.STRING,
      unique: false,
    },
    position: {
      type: Sequelize.STRING,
      unique: false,
    },
    allergy: {
      type: Sequelize.STRING,
      unique: false,
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
    tableName: 'Member'
  }
)
