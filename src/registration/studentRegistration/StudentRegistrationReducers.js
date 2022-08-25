import {
  CHECK_ACADEMIC_YEAR_FOR_STUDENT_FAIL,
  CHECK_ACADEMIC_YEAR_FOR_STUDENT_REQUEST,
  CHECK_ACADEMIC_YEAR_FOR_STUDENT_RESET,
  CHECK_ACADEMIC_YEAR_FOR_STUDENT_SUCCESS,
  CHECK_REGISTRATION_FOR_STUDENT_FAIL,
  CHECK_REGISTRATION_FOR_STUDENT_REQUEST,
  CHECK_REGISTRATION_FOR_STUDENT_RESET,
  CHECK_REGISTRATION_FOR_STUDENT_SUCCESS,
  CHECK_ROLLNO_FOR_STUDENT_FAIL,
  CHECK_ROLLNO_FOR_STUDENT_REQUEST,
  CHECK_ROLLNO_FOR_STUDENT_RESET,
  CHECK_ROLLNO_FOR_STUDENT_SUCCESS,
  CREATE_SINGLE_STUDENT_REGISTRATION_FAIL,
  CREATE_SINGLE_STUDENT_REGISTRATION_REQUEST,
  CREATE_SINGLE_STUDENT_REGISTRATION_RESET,
  CREATE_SINGLE_STUDENT_REGISTRATION_SUCCESS,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_RESET,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_FAIL,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_RESET,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_STUDENT_REGISTRATION_DATA_FAIL,
  GET_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_STUDENT_REGISTRATION_DATA_RESET,
  GET_STUDENT_REGISTRATION_DATA_SUCCESS,
  SINGLE_STUDENT_REGISTRATION_CREATE_FAIL,
  SINGLE_STUDENT_REGISTRATION_CREATE_REQUEST,
  SINGLE_STUDENT_REGISTRATION_CREATE_SUCCESS,
  SINGLE_STUDENT_REGISTRATION_EDIT_FAIL,
  SINGLE_STUDENT_REGISTRATION_EDIT_REQUEST,
  SINGLE_STUDENT_REGISTRATION_EDIT_RESET,
  SINGLE_STUDENT_REGISTRATION_EDIT_SUCCESS,
} from "./StudentRegistrationConstants";

export const getInitialStudentRegistrationDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_INITIAL_STUDENT_REGISTRATION_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_STUDENT_REGISTRATION_DATA_SUCCESS:
      return { loading: false, studentRegistrationInitialData: action.payload };
    case GET_INITIAL_STUDENT_REGISTRATION_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getStudentRegistrationDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STUDENT_REGISTRATION_DATA_REQUEST:
      return { loading: true };
    case GET_STUDENT_REGISTRATION_DATA_SUCCESS:
      return { loading: false, studentRegistration: action.payload };
    case GET_STUDENT_REGISTRATION_DATA_FAIL:
      return { loading: false, error: action.payload };
      case GET_STUDENT_REGISTRATION_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleStudentRegistrationDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST:
      return { loading: true };
    case GET_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS:
      return { loading: false, singleStudentRegistration: action.payload };
    case GET_SINGLE_STUDENT_REGISTRATION_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_STUDENT_REGISTRATION_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const singleStudentRegistrationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_STUDENT_REGISTRATION_CREATE_REQUEST:
      return { loading: true };
    case SINGLE_STUDENT_REGISTRATION_CREATE_SUCCESS:
      return { loading: false, createStudentInitialData: action.payload };
    case SINGLE_STUDENT_REGISTRATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleStudentRegistrationEditReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_STUDENT_REGISTRATION_EDIT_REQUEST:
      return { loading: true };
    case SINGLE_STUDENT_REGISTRATION_EDIT_SUCCESS:
      return { loading: false, success: true };
    case SINGLE_STUDENT_REGISTRATION_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_STUDENT_REGISTRATION_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const getCreateSingleStudentRegistrationDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST:
      return { loading: true };
    case GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        getCreateSingleStudentData: action.payload,
      };
    case GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleStudentRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_STUDENT_REGISTRATION_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_STUDENT_REGISTRATION_SUCCESS:
      return {
        loading: false,
        success: true,
        createSingleStudent: action.payload,
      };
    case CREATE_SINGLE_STUDENT_REGISTRATION_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_STUDENT_REGISTRATION_RESET:
      return {};
    default:
      return state;
  }
};

export const checkRegistrationForStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_REGISTRATION_FOR_STUDENT_REQUEST:
      return { loading: true };
    case CHECK_REGISTRATION_FOR_STUDENT_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case CHECK_REGISTRATION_FOR_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_REGISTRATION_FOR_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const checkRollNoForStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_ROLLNO_FOR_STUDENT_REQUEST:
      return { loading: true };
    case CHECK_ROLLNO_FOR_STUDENT_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case CHECK_ROLLNO_FOR_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_ROLLNO_FOR_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const checkAcademicYearForStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_ACADEMIC_YEAR_FOR_STUDENT_REQUEST:
      return { loading: true };
    case CHECK_ACADEMIC_YEAR_FOR_STUDENT_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case CHECK_ACADEMIC_YEAR_FOR_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_ACADEMIC_YEAR_FOR_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

