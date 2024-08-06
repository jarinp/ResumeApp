// action.js

import { 
  SELECT_TEMPLATE,
  SET_PERSONAL_INFO,
  SET_EDUCATION,
  SET_KEY_SKILLS,
  SET_RESUME_NAME,
  SET_USER_DETAILS,
  SET_WORK_EXPERIENCE,
  SET_USER_IMAGE,
  SET_ACTIVE_TAB
} from './actionType';



export const TemplateSelection = (Id) => ({
  type: SELECT_TEMPLATE,
  payload: Id,
});

export const setPersonalInfo = (data) => ({
  type: SET_PERSONAL_INFO,
  payload: data
});

export const setWorkExperience = (data) => ({
  type: SET_WORK_EXPERIENCE,
  payload: data
});

export const setEducation = (data) => ({
  type: SET_EDUCATION,
  payload: data
});

export const setKeySkills = (data) => ({
  type: SET_KEY_SKILLS,
  payload: data
});

export const setResumeName = (name) => ({
  type: SET_RESUME_NAME,
  payload: name
});

export const setUserDetails = (details) => ({
  type: SET_USER_DETAILS,
  payload: details
});

export const setUserImage = (image) => ({
  type: SET_USER_IMAGE,
  payload: image
});
