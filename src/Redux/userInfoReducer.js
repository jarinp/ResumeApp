
import {
    SET_ACTIVE_TAB,
    SET_PERSONAL_INFO,
    SET_EDUCATION,
    SET_KEY_SKILLS,
    SET_RESUME_NAME,
    SET_USER_DETAILS,
    SET_WORK_EXPERIENCE,
    SET_USER_IMAGE
  } from './actionType.js';
  
  const initialState = {
    activeTab: 0,
    resumeName: '',
    userDetails: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        objective: '',
        image: ''
      },
      education: [],
      keySkills: [],
      workExperience: []
    }
  };
  
  const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ACTIVE_TAB:
        return {
          ...state,
          activeTab: action.payload
         };
      case SET_USER_DETAILS:
        return {
          ...state,
          userDetails: action.payload
        };
      case SET_PERSONAL_INFO:
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            personalInfo: action.payload
          }
        };
      case SET_USER_IMAGE:
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            personalInfo: {
              ...state.userDetails.personalInfo,
              image: action.payload,
            },
          },
        };
      case SET_WORK_EXPERIENCE:
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            workExperience: action.payload
          }
        };
      case SET_EDUCATION:
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            education: action.payload
          }
        };
      case SET_KEY_SKILLS:
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            keySkills: action.payload
          }
        };
      case SET_RESUME_NAME:
        return {
          ...state,
          resumeName: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userInfoReducer;
  