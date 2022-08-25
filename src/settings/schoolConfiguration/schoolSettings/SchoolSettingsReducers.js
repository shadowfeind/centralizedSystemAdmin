import {
  GET_ALL_SCHOOL_SETTINGS_FAIL,
  GET_ALL_SCHOOL_SETTINGS_REQUEST,
  GET_ALL_SCHOOL_SETTINGS_RESET,
  GET_ALL_SCHOOL_SETTINGS_SUCCESS,
  GET_SINGLE_SCHOOL_SETTINGS_FAIL,
  GET_SINGLE_SCHOOL_SETTINGS_REQUEST,
  GET_SINGLE_SCHOOL_SETTINGS_RESET,
  GET_SINGLE_SCHOOL_SETTINGS_SUCCESS,
  SCHOOL_SETTINGS_CREATE_FAIL,
  SCHOOL_SETTINGS_CREATE_REQUEST,
  SCHOOL_SETTINGS_CREATE_RESET,
  SCHOOL_SETTINGS_CREATE_SUCCESS,
  UPDATE_SINGLE_SCHOOL_SETTINGS_FAIL,
  UPDATE_SINGLE_SCHOOL_SETTINGS_REQUEST,
  UPDATE_SINGLE_SCHOOL_SETTINGS_RESET,
  UPDATE_SINGLE_SCHOOL_SETTINGS_SUCCESS,
} from "./SchoolSettingsConstants";

export const getAllSchoolSettings = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SCHOOL_SETTINGS_REQUEST:
      return { loading: true };
    case GET_ALL_SCHOOL_SETTINGS_SUCCESS:
      return { loading: false, schoolSettings: action.payload };
    case GET_ALL_SCHOOL_SETTINGS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SCHOOL_SETTINGS_RESET:
      return {};
    default:
      return state;
  }
};

export const createSchoolSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_SETTINGS_CREATE_REQUEST:
      return { loading: true };
    case SCHOOL_SETTINGS_CREATE_SUCCESS:
      return {
        loading: false,
        createSchoolSetting: action.payload,
        success: true,
      };
    case SCHOOL_SETTINGS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_SETTINGS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleSchoolSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_SCHOOL_SETTINGS_REQUEST:
      return { loading: true };
    case GET_SINGLE_SCHOOL_SETTINGS_SUCCESS:
      return { loading: false, singleSchoolSetting: action.payload };
    case GET_SINGLE_SCHOOL_SETTINGS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_SCHOOL_SETTINGS_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleSchoolSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_SCHOOL_SETTINGS_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_SCHOOL_SETTINGS_SUCCESS:
      return {
        loading: false,
        updatedSchoolSetting: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_SCHOOL_SETTINGS_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_SCHOOL_SETTINGS_RESET:
      return {};
    default:
      return state;
  }
};
