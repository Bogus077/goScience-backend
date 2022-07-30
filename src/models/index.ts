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

export {User, Class, UserClass, Kid, TasksDay, TasksWeek, TasksMonth, TasksQuarter, UserSettings, UserRefresh};

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
