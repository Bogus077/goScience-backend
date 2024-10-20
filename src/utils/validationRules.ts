import Validator, { Rules } from 'validatorjs';

export function validateData(
  data: { [key: string | number]: string | number },
  rules: Rules
) {
  const validation = new Validator(data, rules);

  if (validation.fails()) throw { errorMessage: validation.errors.all() };
}

//user
export const userSignUpRules = {
  phone: 'string|required',
  password: 'string|required',
  name: 'string|required',
  surname: 'string|required',
};

export const userLoginRules = {
  phone: 'string|required',
  password: 'string|required',
};

export const userPasswordChangeRules = {
  phone: 'string|required',
  password: 'string|required',
};

export const userClearPasswordRules = {
  phone: 'string|required',
};

export const updateUserRules = {
  id: 'integer|required',
  name: 'string|required',
  surname: 'string|required',
  middleName: 'string|required',
  phone: 'string|required',
};

export const addRoleRules = {
  name: 'string|required',
};

export const addRoleToUserRules = {
  UserId: 'integer|required',
  RoleId: 'integer|required',
};

//class
export const createClassRules = {
  label: 'string|required',
  userId: 'integer|required',
};

export const changeClassRules = {
  id: 'integer|required',
};

//kid
export const createKidRules = {
  name: 'string|required',
  surname: 'string|required',
  ClassId: 'integer|required',
};

export const updateKidRules = {
  id: 'integer|required',
  name: 'string|required',
  surname: 'string|required',
  phone: 'string',
};

export const kidPhoneRules = {
  phone: 'string|required',
};

export const removeKidRules = {
  id: 'integer|required',
};

//tasks
export const getTasksRules = {
  KidId: 'integer|required',
};

export const getTasksHelpRules = {
  KidId: 'string|required',
};

export const createTaskgroupRules = {
  KidId: 'integer|required',
};

export const createTaskRules = {
  label: 'string|required',
  status: 'boolean|required',
};

export const changeTaskStatusRules = {
  type: 'string|required',
  status: 'boolean|required',
  id: 'integer|required',
};

export const addDayToTaskRules = {
  id: 'integer|required',
};

export const removeTaskRules = {
  type: 'string|required',
  id: 'integer|required',
};

export const createTeamRules = {
  label: 'string|required',
};

export const updateTeamRules = {
  id: 'integer|required',
  label: 'string|required',
};

export const removeTeamRules = {
  id: 'integer|required',
};

export const addKidToTeamRules = {
  TeamId: 'integer|required',
};

export const removeKidFromTeamRules = {
  TeamId: 'integer|required',
};

export const createProjectRules = {
  label: 'string|required',
};

export const updateProjectRules = {
  ProjectId: 'integer|required',
  label: 'string|required',
};

export const removeProjectRules = {
  ProjectId: 'integer|required',
};

export const createProjectTaskRules = {
  label: 'string|required',
  date: 'string|required',
  ProjectId: 'integer|required',
};

export const updateProjectTaskRules = {
  ProjectTaskId: 'integer|required',
  label: 'string|required',
  date: 'string|required',
  ProjectId: 'integer|required',
};

export const removeProjectTaskRules = {
  ProjectTaskId: 'integer|required',
};

export const doneProjectTaskRules = {
  ProjectTaskId: 'integer|required',
};

export const addKidToProjectTaskRules = {
  ProjectTaskId: 'integer|required',
};

export const getProjectTaskByIdRules = {
  ProjectTaskId: 'integer|required',
};

export const archiveProjectRules = {
  ProjectId: 'integer|required',
};

//summary
export const addKidUserSummaryRules = {
  KidId: 'integer|required',
  label: 'string|required',
  type: 'string|required',
};

export const changeSummaryStatusRules = {
  type: 'string|required',
  status: 'boolean|required',
};

//members
export const addMemberRules = {
  name: 'string|required',
  surname: 'string|required',
  sex: 'string|required',
  plat: 'integer|required',
};

export const changeMemberStatusRules = {
  id: 'integer|required',
  status: 'boolean|required',
};

export const editMemberRules = {
  id: 'integer|required',
  name: 'string|required',
  surname: 'string|required',
  sex: 'string|required',
  plat: 'integer|required',
};

export const removeMemberRules = {
  id: 'integer|required',
};

//notifications
export const addNotificationRules = {
  title: 'string|required',
  text: 'string|required',
};

export const readNotificationRules = {
  id: 'integer|required',
};

export const removeNotificationRules = {
  id: 'integer|required',
};

//attendance
export const memberAttendanceRules = {
  id: 'integer|required',
};

//teachers
export const addTeacherRules = {
  name: 'string|required',
  surname: 'string|required',
  middlename: 'string|required',
  phone: 'string|required',
};

export const removeTeacherRules = {
  id: 'integer|required',
};

export const editTeacherRules = {
  id: 'integer|required',
  name: 'string|required',
  surname: 'string|required',
  middlename: 'string|required',
  phone: 'string|required',
};

//events
export const addEventRules = {
  title: 'string|required',
  startAddress: 'string|required',
  finishAddress: 'string|required',
  orderDate: 'string|required',
  startDate: 'string|required',
};

export const updateEventRules = {
  id: 'integer|required',
  title: 'string|required',
  startAddress: 'string|required',
  finishAddress: 'string|required',
  orderDate: 'string|required',
  startDate: 'string|required',
};

export const removeEventRules = {
  id: 'integer|required',
};
