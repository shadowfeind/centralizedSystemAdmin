import {
  ACADEMIC_FACULTY_CREATE_FAIL,
  ACADEMIC_FACULTY_CREATE_REQUEST,
  ACADEMIC_FACULTY_CREATE_RESET,
  ACADEMIC_FACULTY_CREATE_SUCCESS,
  GET_ACADEMIC_FACULTY_OPTION_FAIL,
  GET_ACADEMIC_FACULTY_OPTION_REQUEST,
  GET_ACADEMIC_FACULTY_OPTION_RESET,
  GET_ACADEMIC_FACULTY_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_FACULTY_FAIL,
  GET_ALL_ACADEMIC_FACULTY_REQUEST,
  GET_ALL_ACADEMIC_FACULTY_RESET,
  GET_ALL_ACADEMIC_FACULTY_SUCCESS,
  GET_SINGLE_ACADEMIC_FACULTY_FAIL,
  GET_SINGLE_ACADEMIC_FACULTY_REQUEST,
  GET_SINGLE_ACADEMIC_FACULTY_RESET,
  GET_SINGLE_ACADEMIC_FACULTY_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_FACULTY_FAIL,
  UPDATE_SINGLE_ACADEMIC_FACULTY_REQUEST,
  UPDATE_SINGLE_ACADEMIC_FACULTY_RESET,
  UPDATE_SINGLE_ACADEMIC_FACULTY_SUCCESS,
} from "./AcademicFacultyConstants";

export const getAllAcademicFaculty = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_FACULTY_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_FACULTY_SUCCESS:
      return { loading: false, academicFaculty: action.payload };
    case GET_ALL_ACADEMIC_FACULTY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_FACULTY_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicFacultyReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_FACULTY_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_FACULTY_CREATE_SUCCESS:
      return { loading: false, academicFaculty: action.payload, success: true };
    case ACADEMIC_FACULTY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_FACULTY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAcademicFacultyOptionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACADEMIC_FACULTY_OPTION_REQUEST:
      return { loading: true };
    case GET_ACADEMIC_FACULTY_OPTION_SUCCESS:
      return { loading: false, academicFacultyOption: action.payload };
    case GET_ACADEMIC_FACULTY_OPTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACADEMIC_FACULTY_OPTION_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicFacultyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_FACULTY_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_FACULTY_SUCCESS:
      return { loading: false, singleAcademicFaculty: action.payload };
    case GET_SINGLE_ACADEMIC_FACULTY_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_FACULTY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicFacultyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_FACULTY_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_FACULTY_SUCCESS:
      return {
        loading: false,
        updatedAcademicFaculty: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_FACULTY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_FACULTY_RESET:
      return {};
    default:
      return state;
  }
};
