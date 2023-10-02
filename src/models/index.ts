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
import { Member } from './Member';
import { Role } from './Role';
import { UserRole } from './UserRole';
import { MemberLogs } from './MemberLogs';
import { Notifications } from './Notifications';
import { UserNotifications } from './UserNotifications';
import { MemberAttendance } from './MembersAttandance';
import { MemberContact } from './MemberContact';
import { Teacher } from './Teacher';
import { Event } from './Event';
import { EventTeacher } from './EventTeacher';
import { EventMember } from './EventMember';

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
  Member,
  Role,
  UserRole,
  MemberLogs,
  Notifications,
  UserNotifications,
  MemberAttendance,
  MemberContact,
  Teacher,
  Event,
  EventTeacher,
  EventMember,
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

User.belongsToMany(Class, { through: UserClass });
Class.belongsToMany(User, { through: UserClass });

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

//Stats
User.hasMany(StatsTask);
StatsTask.belongsTo(User);
Kid.hasMany(StatsTask);
StatsTask.belongsTo(Kid);
TasksDay.hasOne(StatsTask);
StatsTask.belongsTo(TasksDay);

//Projects
Kid.belongsToMany(Team, { through: KidTeam });
Team.belongsToMany(Kid, { through: KidTeam });

Project.belongsTo(Team);
Team.hasMany(Project);

ProjectTask.belongsTo(Project);
Project.hasMany(ProjectTask);

Kid.belongsToMany(ProjectTask, { through: KidProjectTask });
ProjectTask.belongsToMany(Kid, { through: KidProjectTask });

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

//Logs
User.hasMany(MemberLogs);
MemberLogs.belongsTo(User);

//Notifications
User.hasMany(UserNotifications);
UserNotifications.belongsTo(User);
Notifications.hasMany(UserNotifications);
UserNotifications.belongsTo(Notifications);

//MembersAttendance
Member.hasMany(MemberAttendance);
MemberAttendance.belongsTo(Member);

//Contacts
Member.hasMany(MemberContact);
MemberContact.belongsTo(Member);

//Events
Event.belongsToMany(Teacher, { through: EventTeacher });
Teacher.belongsToMany(Event, { through: EventTeacher });
Event.belongsToMany(Member, { through: EventMember });
Member.belongsToMany(Event, { through: EventMember });

