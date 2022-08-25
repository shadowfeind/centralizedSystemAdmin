import {
  ACADEMIC_YEAR_CREATE_FAIL,
  ACADEMIC_YEAR_CREATE_REQUEST,
  ACADEMIC_YEAR_CREATE_RESET,
  ACADEMIC_YEAR_CREATE_SUCCESS,
  GET_ACADEMIC_YEAR_CHECK_FAIL,
  GET_ACADEMIC_YEAR_CHECK_REQUEST,
  GET_ACADEMIC_YEAR_CHECK_RESET,
  GET_ACADEMIC_YEAR_CHECK_SUCCESS,
  GET_ACADEMIC_YEAR_OPTION_FAIL,
  GET_ACADEMIC_YEAR_OPTION_REQUEST,
  GET_ACADEMIC_YEAR_OPTION_RESET,
  GET_ACADEMIC_YEAR_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_YEAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_RESET,
  GET_ALL_ACADEMIC_YEAR_SUCCESS,
  GET_SINGLE_ACADEMIC_YEAR_FAIL,
  GET_SINGLE_ACADEMIC_YEAR_REQUEST,
  GET_SINGLE_ACADEMIC_YEAR_RESET,
  GET_SINGLE_ACADEMIC_YEAR_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_YEAR_FAIL,
  UPDATE_SINGLE_ACADEMIC_YEAR_REQUEST,
  UPDATE_SINGLE_ACADEMIC_YEAR_RESET,
  UPDATE_SINGLE_ACADEMIC_YEAR_SUCCESS,
} from "./AcademicYearConstant";

export const getAllAcademicYear = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_YEAR_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_YEAR_SUCCESS:
      return { loading: false, academicYear: action.payload };
    case GET_ALL_ACADEMIC_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicYearReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_YEAR_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_YEAR_CREATE_SUCCESS:
      return { loading: false, academicYear: action.payload, success: true };
    case ACADEMIC_YEAR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_YEAR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAcademicYearOptionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACADEMIC_YEAR_OPTION_REQUEST:
      return { loading: true };
    case GET_ACADEMIC_YEAR_OPTION_SUCCESS:
      return { loading: false, academicYearOption: action.payload };
    case GET_ACADEMIC_YEAR_OPTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACADEMIC_YEAR_OPTION_RESET:
      return {};
    default:
      return state;
  }
};

export const getAcademicYearCheckReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACADEMIC_YEAR_CHECK_REQUEST:
      return { loading: true };
    case GET_ACADEMIC_YEAR_CHECK_SUCCESS:
      return { loading: false, academicYearCheck: action.payload };
    case GET_ACADEMIC_YEAR_CHECK_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACADEMIC_YEAR_CHECK_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicYearReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_YEAR_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_YEAR_SUCCESS:
      return { loading: false, singleAcademicYear: action.payload };
    case GET_SINGLE_ACADEMIC_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicYearReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_YEAR_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_YEAR_SUCCESS:
      return {
        loading: false,
        updatedAcademicYear: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_YEAR_RESET:
      return {};
    default:
      return state;
  }
};
