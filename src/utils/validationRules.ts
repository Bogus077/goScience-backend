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

//kid
export const createKidRules = {
  name: 'string|required',
  surname: 'string|required',
  phone: 'string|required',
  ClassId: 'integer|required',
}
