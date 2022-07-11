'use strict';
import { sequelize } from '../database/database.config';
import { User } from './User';
import { Class } from './Class';
import { UserClass } from './UserClass';
import { Kid } from './Kid';
// import { AvailableKid } from './AvailableKid';
// import { TeamKid } from './TeamKid';
// import { Competition } from './Competition';
// import { CompetitionApplication } from './CompetitionApplication'

export {User, Class, UserClass, Kid};
// export const AvailableKidModel = AvailableKid;
// export const TeamKidModel = TeamKid;
// export const CompetitionModel = Competition;
// export const CompetitionApplicationModel = CompetitionApplication;

Kid.belongsTo(Class);
Class.hasMany(Kid);

User.belongsToMany(Class, {through: UserClass});
Class.belongsToMany(User, {through: UserClass});
