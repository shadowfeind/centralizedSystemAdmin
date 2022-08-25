import {
  ACADEMIC_YEAR_CALENDAR_CREATE_FAIL,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_FAIL,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_REQUEST,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_RESET,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_SUCCESS,
  ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST,
  ACADEMIC_YEAR_CALENDAR_CREATE_RESET,
  ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS,
  ACADEMIC_YEAR_CALENDAR_SEARCH_FAIL,
  ACADEMIC_YEAR_CALENDAR_SEARCH_REQUEST,
  ACADEMIC_YEAR_CALENDAR_SEARCH_RESET,
  ACADEMIC_YEAR_CALENDAR_SEARCH_SUCCESS,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_FAIL,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_REQUEST,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_SUCCESS,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_RESET,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
} from "./AcademicYearCalendarConstant";

export const getAllAcademicYearCalendar = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS:
      return { loading: false, academicYearCalendar: action.payload };
    case GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_YEAR_CALENDAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getAcademicYearCalendarProgramReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_REQUEST:
      return { loading: true };
    case GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_SUCCESS:
      return { loading: false, academicYearCalendarProgram: action.payload };
    case GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createAcademicYearCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS:
      return {
        loading: false,
        createAcademicYearCalendarOptions: action.payload,
      };
    case ACADEMIC_YEAR_CALENDAR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_YEAR_CALENDAR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicYearCalendarPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_YEAR_CALENDAR_CREATE_POST_REQUEST:
      return { loading: true };
    case ACADEMIC_YEAR_CALENDAR_CREATE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ACADEMIC_YEAR_CALENDAR_CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_YEAR_CALENDAR_CREATE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const academicYearCalendarSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_YEAR_CALENDAR_SEARCH_REQUEST:
      return { loading: true };
    case ACADEMIC_YEAR_CALENDAR_SEARCH_SUCCESS:
      return {
        loading: false,
        academicSearch: action.payload,
      };
    case ACADEMIC_YEAR_CALENDAR_SEARCH_FAIL:
      return { loading: false, error: action.payload };
      case ACADEMIC_YEAR_CALENDAR_SEARCH_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicYearCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS:
      return { loading: false, singleAcademicYearCalendar: action.payload };
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicYearCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET:
      return {};
    default:
      return state;
  }
};
