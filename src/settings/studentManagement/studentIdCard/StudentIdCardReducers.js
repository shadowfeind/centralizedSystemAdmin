import {
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST,
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_RESET,
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
  GET_INITIAL_STUDENT_ID_CARD_DATA_FAIL,
  GET_INITIAL_STUDENT_ID_CARD_DATA_REQUEST,
  GET_INITIAL_STUDENT_ID_CARD_DATA_RESET,
  GET_INITIAL_STUDENT_ID_CARD_DATA_SUCCESS,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_RESET,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
} from "./StudentIdCardConstants";

export const getInitialStudentIdCardDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_STUDENT_ID_CARD_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_STUDENT_ID_CARD_DATA_SUCCESS:
      return { loading: false, studentIdCardInitialData: action.payload };
    case GET_INITIAL_STUDENT_ID_CARD_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_INITIAL_STUDENT_ID_CARD_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getActiveStudentsForStudentIdCardDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST:
      return { loading: true };
    case GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS:
      return {
        loading: false,
        activeStudentsForIdCard: action.payload,
      };
    case GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_RESET:
      return {};
    default:
      return state;
  }
};

export const getPrintBulkStudentsForStudentIdCardDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST:
      return { loading: true };
    case GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS:
      return {
        loading: false,
       printBulkStudentsForIdCard: action.payload,
      };
    case GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_RESET:
      return {};
    default:
      return state;
  }
};
