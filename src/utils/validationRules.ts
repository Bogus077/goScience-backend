import Validator, { Rules } from 'validatorjs';

export function validateData(data: {[key: string | number]: string | number}, rules: Rules) {
  const validation = new Validator(data, rules);

  if (validation.fails()) throw { errorMessage: validation.errors.all() };
}

//user
export const userSignUpRules = {
  phone: 'string|required',
  password: 'string|required',
  name: 'string|required',
  surname: 'string|required',
}

export const userLoginRules = {
  phone: 'string|required',
  password: 'string|required',
}

//class
export const createClassRules = {
  label: 'string|required',
  userId: 'integer|required',
}

export const changeClassRules = {
  id: 'integer|required',
}

//kid
export const createKidRules = {
  name: 'string|required',
  surname: 'string|required',
  ClassId: 'integer|required',
}

export const updateKidRules = {
  id: 'integer|required',
  name: 'string|required',
  surname: 'string|required',
  phone: 'string',
}

export const kidPhoneRules = {
  phone: 'string|required',
}

export const removeKidRules = {
  id: 'integer|required',
}

//tasks
export const getTasksRules = {
  KidId: 'integer|required',
}

export const createTaskgroupRules = {
  KidId: 'integer|required',
}

export const createTaskRules = {
  KidId: 'integer|required',
  label: 'string|required',
  status: 'boolean|required',
}
