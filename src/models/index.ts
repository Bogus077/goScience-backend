'use strict';
import { sequelize } from '../database/database.config';
import { User } from './User';
import { AvailableKid } from './AvailableKid';
import { TeamKid } from './TeamKid';
import { Competition } from './Competition';
import { CompetitionApplication } from './CompetitionApplication'

export const UserModel = User;
export const AvailableKidModel = AvailableKid;
export const TeamKidModel = TeamKid;
export const CompetitionModel = Competition;
export const CompetitionApplicationModel = CompetitionApplication;
