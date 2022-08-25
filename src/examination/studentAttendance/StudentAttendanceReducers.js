import {
  GET_ALL_STUDEN_ATTENDANCE_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_RESET,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS,
  GET_ALL_STUDEN_ATTENDANCE_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_RESET,
  GET_ALL_STUDEN_ATTENDANCE_SUCCESS,
  GET_BULK_STUDENT_ATTENDANCE_FAIL,
  GET_BULK_STUDENT_ATTENDANCE_REQUEST,
  GET_BULK_STUDENT_ATTENDANCE_RESET,
  GET_BULK_STUDENT_ATTENDANCE_SUCCESS,
  GET_GENERATED_STUDENT_ATTENDANCE_FAIL,
  GET_GENERATED_STUDENT_ATTENDANCE_REQUEST,
  GET_GENERATED_STUDENT_ATTENDANCE_RESET,
  GET_GENERATED_STUDENT_ATTENDANCE_SUCCESS,
  POST_BULK_STUDENT_ATTENDANCE_FAIL,
  POST_BULK_STUDENT_ATTENDANCE_REQUEST,
  POST_BULK_STUDENT_ATTENDANCE_RESET,
  POST_BULK_STUDENT_ATTENDANCE_SUCCESS,
} from "./StudentAttendanceConstants";

export const getAllStudentAttendanceInitialDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS:
      return { loading: false, studentAttendanceInitData: action.payload };
    case GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_STUDEN_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_ALL_STUDEN_ATTENDANCE_SUCCESS:
      return { loading: false, allStudentAttendance: action.payload };
    case GET_ALL_STUDEN_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STUDEN_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const getBulkStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_STUDENT_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_BULK_STUDENT_ATTENDANCE_SUCCESS:
      return { loading: false, bulkStudentAttendance: action.payload };
    case GET_BULK_STUDENT_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_STUDENT_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const postBulkStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BULK_STUDENT_ATTENDANCE_REQUEST:
      return { loading: true };
    case POST_BULK_STUDENT_ATTENDANCE_SUCCESS:
      return { loading: false, success: true };
    case POST_BULK_STUDENT_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case POST_BULK_STUDENT_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const getGeneratedStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_GENERATED_STUDENT_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_GENERATED_STUDENT_ATTENDANCE_SUCCESS:
      return { loading: false, generateStudentAttendance: action.payload };
    case GET_GENERATED_STUDENT_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_GENERATED_STUDENT_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};
