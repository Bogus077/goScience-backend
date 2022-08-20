'use strict';
import { User } from './User';
import { Class } from './Class';
import { UserClass } from './UserClass';
import { Kid } from './Kid';
import { TasksDay } from './TasksDay';
import { TasksWeek } from './TasksWeek';
import { TasksMonth } from './TasksMonth';
import { TasksQuarter } from './TasksQuarter';
import { UserSettings } from './UserSettings';
import { UserRefresh } from './UserRefresh';
import { StatsTask } from './StatsTask';
import { Team } from './Team';
import { KidTeam } from './KidTeam';
import { Project } from './Project';
import { ProjectTask } from './ProjectTask';
import { KidProjectTask } from './KidProjectTask';
import { KidSummaryTask } from './KidSummaryTask';
import { KidSummaryProjectTask } from './KidSummaryProjectTask';
import { KidSummaryUser } from './KidSummaryUser';

export {
  User, 
  Class, 
  UserClass, 
  Kid, 
  TasksDay, 
  TasksWeek,
  TasksMonth,
  TasksQuarter,
  UserSettings,
  UserRefresh,
  StatsTask,
  Team,
  KidTeam,
  Project,
  ProjectTask,
  KidProjectTask,
  KidSummaryTask,
  KidSummaryProjectTask,
  KidSummaryUser,
};

User.hasMany(UserRefresh);
UserRefresh.belongsTo(User);

UserSettings.belongsTo(User);
User.hasOne(UserSettings);
UserSettings.belongsTo(Class);
Class.hasMany(UserSettings);

Kid.belongsTo(Class);
Class.hasMany(Kid);

Kid.hasMany(TasksDay);
Kid.hasMany(TasksWeek);
Kid.hasMany(TasksMonth);
Kid.hasMany(TasksQuarter);
TasksDay.belongsTo(Kid);
TasksWeek.belongsTo(Kid);
TasksMonth.belongsTo(Kid);
TasksQuarter.belongsTo(Kid);

User.belongsToMany(Class, {through: UserClass});
Class.belongsToMany(User, {through: UserClass});

//Stats
User.hasMany(StatsTask);
StatsTask.belongsTo(User);
Kid.hasMany(StatsTask);
StatsTask.belongsTo(Kid);
TasksDay.hasOne(StatsTask);
StatsTask.belongsTo(TasksDay);

//Projects
Kid.belongsToMany(Team, {through: KidTeam});
Team.belongsToMany(Kid, {through: KidTeam});

Project.belongsTo(Team);
Team.hasMany(Project);

ProjectTask.belongsTo(Project);
Project.hasMany(ProjectTask);

Kid.belongsToMany(ProjectTask, {through: KidProjectTask});
ProjectTask.belongsToMany(Kid, {through: KidProjectTask});

User.hasMany(Team);
Team.belongsTo(User);
User.hasMany(Project);
Project.belongsTo(User);

//Summary
KidSummaryTask.belongsTo(Kid);
Kid.hasMany(KidSummaryTask);

KidSummaryProjectTask.belongsTo(Kid);
Kid.hasMany(KidSummaryProjectTask);

KidSummaryUser.belongsTo(Kid);
Kid.hasMany(KidSummaryUser);
