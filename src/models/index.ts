'use strict';
import { User } from './User';
import { Class } from './Class';
import { UserClass } from './UserClass';
import { Kid } from './Kid';
import { Taskgroup } from './Taskgroup';
import { TasksDay } from './TasksDay';
import { TasksWeek } from './TasksWeek';
import { TasksQuarter } from './TasksQuarter';
import { UserSettings } from './UserSettings';

export {User, Class, UserClass, Kid, Taskgroup, TasksDay, TasksWeek, TasksQuarter, UserSettings};

UserSettings.belongsTo(User);
User.hasOne(UserSettings);
UserSettings.belongsTo(Class);
Class.hasMany(UserSettings);

Kid.belongsTo(Class);
Class.hasMany(Kid);

Kid.hasMany(Taskgroup);
Taskgroup.belongsTo(Kid);
Taskgroup.hasMany(TasksDay);
Taskgroup.hasMany(TasksWeek);
Taskgroup.hasMany(TasksQuarter);
TasksDay.belongsTo(Taskgroup);
TasksWeek.belongsTo(Taskgroup);
TasksQuarter.belongsTo(Taskgroup);

User.belongsToMany(Class, {through: UserClass});
Class.belongsToMany(User, {through: UserClass});
