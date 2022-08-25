import {
  CREATE_SINGLE_TEACHER_FAC_SUB_FAIL,
  CREATE_SINGLE_TEACHER_FAC_SUB_REQUEST,
  CREATE_SINGLE_TEACHER_FAC_SUB_RESET,
  CREATE_SINGLE_TEACHER_FAC_SUB_SUCCESS,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_RESET,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
  DELETE_TEACHER_FAC_SUB_FAIL,
  DELETE_TEACHER_FAC_SUB_REQUEST,
  DELETE_TEACHER_FAC_SUB_RESET,
  DELETE_TEACHER_FAC_SUB_SUCCESS,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_RESET,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_FAIL,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_RESET,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_FAIL,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_REQUEST,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_RESET,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_SUCCESS,
  SINGLE_TEACHER_FAC_SUB_EDIT_FAIL,
  SINGLE_TEACHER_FAC_SUB_EDIT_REQUEST,
  SINGLE_TEACHER_FAC_SUB_EDIT_RESET,
  SINGLE_TEACHER_FAC_SUB_EDIT_SUCCESS,
} from "./TeacherFacultySubjectConstants";

export const getAllTeacherFacSubInitialDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS:
      return { loading: false, teacherFacInitData: action.payload };
    case GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllTeacherFacSubListDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TEACHER_FAC_SUB_LIST_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_TEACHER_FAC_SUB_LIST_DATA_SUCCESS:
      return {
        loading: false,
        teacherFacListData: action.payload,
        currentQuery: action.query,
      };
    case GET_ALL_TEACHER_FAC_SUB_LIST_DATA_FAIL:
      return { loading: false, error: action.payload };

    case GET_ALL_TEACHER_FAC_SUB_LIST_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleTeacherFacSubDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TEACHER_FAC_SUB_DATA_REQUEST:
      return { loading: true };
    case GET_SINGLE_TEACHER_FAC_SUB_DATA_SUCCESS:
      return { loading: false, singleTeacherFacData: action.payload };
    case GET_SINGLE_TEACHER_FAC_SUB_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TEACHER_FAC_SUB_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const singleTeacherFacSubEditReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_TEACHER_FAC_SUB_EDIT_REQUEST:
      return { loading: true };
    case SINGLE_TEACHER_FAC_SUB_EDIT_SUCCESS:
      return { loading: false, success: true };
    case SINGLE_TEACHER_FAC_SUB_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_TEACHER_FAC_SUB_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const createTeacherFacSubInitDataReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST:
      return { loading: true };
    case CREATE_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS:
      return { loading: false, createInitTeacherFacData: action.payload };
    case CREATE_TEACHER_FAC_SUB_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_TEACHER_FAC_SUB_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleTeacherFacSubReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_TEACHER_FAC_SUB_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_TEACHER_FAC_SUB_SUCCESS:
      return { loading: false, success: true };
    case CREATE_SINGLE_TEACHER_FAC_SUB_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_TEACHER_FAC_SUB_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteTeacherFacSubReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TEACHER_FAC_SUB_REQUEST:
      return { loading: true };
    case DELETE_TEACHER_FAC_SUB_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TEACHER_FAC_SUB_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_TEACHER_FAC_SUB_RESET:
      return {};
    default:
      return state;
  }
};
