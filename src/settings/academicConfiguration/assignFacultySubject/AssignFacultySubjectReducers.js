import {
  ASSIGN_FACULTY_SUBJECT_EDIT_FAIL,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_FAIL,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_REQUEST,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_RESET,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_EDIT_REQUEST,
  ASSIGN_FACULTY_SUBJECT_EDIT_RESET,
  ASSIGN_FACULTY_SUBJECT_EDIT_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_GENERATE_FAIL,
  ASSIGN_FACULTY_SUBJECT_GENERATE_REQUEST,
  ASSIGN_FACULTY_SUBJECT_GENERATE_RESET,
  ASSIGN_FACULTY_SUBJECT_GENERATE_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_GET_CREATE_FAIL,
  ASSIGN_FACULTY_SUBJECT_GET_CREATE_REQUEST,
  ASSIGN_FACULTY_SUBJECT_GET_CREATE_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_GET_FAIL,
  ASSIGN_FACULTY_SUBJECT_GET_REQUEST,
  ASSIGN_FACULTY_SUBJECT_GET_RESET,
  ASSIGN_FACULTY_SUBJECT_GET_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_POST_FAIL,
  ASSIGN_FACULTY_SUBJECT_POST_REQUEST,
  ASSIGN_FACULTY_SUBJECT_POST_RESET,
  ASSIGN_FACULTY_SUBJECT_POST_SUCCESS,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_RESET,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_EDIT_REQUEST,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_RESET,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_SUCCESS,
} from "./AssignFacultySubjectConstants";

export const getAllAssignFacultySubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST:
      return { loading: true };
    case GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS:
      return { loading: false, allAcademicSubjects: action.payload };
    case GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getListAssignFacultySubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST:
      return { loading: true };
    case GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS:
      return { loading: false, academicSubjectsList: action.payload };
    case GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
      case GET_LIST_ASSIGN_FACULTY_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAssignFacultySubjectOptionReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_FACULTY_SUBJECT_GET_REQUEST:
      return { loading: true };
    case ASSIGN_FACULTY_SUBJECT_GET_SUCCESS:
      return { loading: false, academicSubjects: action.payload };
    case ASSIGN_FACULTY_SUBJECT_GET_FAIL:
      return { loading: false, error: action.payload };
    case ASSIGN_FACULTY_SUBJECT_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const assignFacultySubjectPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_FACULTY_SUBJECT_POST_REQUEST:
      return { loading: true };
    case ASSIGN_FACULTY_SUBJECT_POST_SUCCESS:
      return { loading: false, success: true };
    case ASSIGN_FACULTY_SUBJECT_POST_FAIL:
      return { loading: false, error: action.payload };
    case ASSIGN_FACULTY_SUBJECT_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleassignFacultySubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ASSIGN_FACULTY_SUBJECT_REQUEST:
      return { loading: true };
    case GET_SINGLE_ASSIGN_FACULTY_SUBJECT_SUCCESS:
      return { loading: false, singleFacultySubject: true };
    case GET_SINGLE_ASSIGN_FACULTY_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ASSIGN_FACULTY_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const assignFacultySubjectEditReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_FACULTY_SUBJECT_EDIT_REQUEST:
      return { loading: true };
    case ASSIGN_FACULTY_SUBJECT_EDIT_SUCCESS:
      return { loading: false, singleFacultySubject: action.payload };
    case ASSIGN_FACULTY_SUBJECT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case ASSIGN_FACULTY_SUBJECT_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const assignFacultySubjectEditPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_FACULTY_SUBJECT_EDIT_POST_REQUEST:
      return { loading: true };
    case ASSIGN_FACULTY_SUBJECT_EDIT_POST_SUCCESS:
      return { loading: false, success: true };
    case ASSIGN_FACULTY_SUBJECT_EDIT_POST_FAIL:
      return { loading: false, error: action.payload };
    case ASSIGN_FACULTY_SUBJECT_EDIT_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const assignFacultySubjectGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_FACULTY_SUBJECT_GENERATE_REQUEST:
      return { loading: true };
    case ASSIGN_FACULTY_SUBJECT_GENERATE_SUCCESS:
      return { loading: false, assignFacSubGenerate: action.payload };
    case ASSIGN_FACULTY_SUBJECT_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSIGN_FACULTY_SUBJECT_GENERATE_RESET:
      return {};
    default:
      return state;
  }
};
