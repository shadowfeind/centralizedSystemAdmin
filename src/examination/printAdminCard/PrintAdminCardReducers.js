import {
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_FAIL,
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_REQUEST,
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET,
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
  GET_INITIAL_ADMIT_CARD_DATA_FAIL,
  GET_INITIAL_ADMIT_CARD_DATA_REQUEST,
  GET_INITIAL_ADMIT_CARD_DATA_SUCCESS,
  PRINT_SINGLE_STUDENT_ADMIT_CARD_FAIL,
  PRINT_SINGLE_STUDENT_ADMIT_CARD_REQUEST,
  PRINT_SINGLE_STUDENT_ADMIT_CARD_SUCCESS,
  PRINT_STUDENTS_ADMIT_CARD_FAIL,
  PRINT_STUDENTS_ADMIT_CARD_REQUEST,
  PRINT_STUDENTS_ADMIT_CARD_SUCCESS,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_FAIL,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_REQUEST,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_RESET,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
} from "./PrintAdminCardConstants";

export const getInitialAdmitCardDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_ADMIT_CARD_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_ADMIT_CARD_DATA_SUCCESS:
      return { loading: false, admitCardInitialData: action.payload };
    case GET_INITIAL_ADMIT_CARD_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getActiveStudentsForAdmitCardDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_REQUEST:
      return { loading: true };
    case GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_SUCCESS:
      return {
        loading: false,
        activeStudentsForAdmitCard: action.payload,
        success: true,
      };
    case GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET:
      return {};
    default:
      return state;
  }
};

export const searchStudentsForAdmitCardDataReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_STUDENTS_FOR_ADMIT_CARD_REQUEST:
      return { loading: true };
    case SEARCH_STUDENTS_FOR_ADMIT_CARD_SUCCESS:
      return {
        loading: false,
        searchStudentsForAdmitCard: action.payload,
        success: true,
      };
    case SEARCH_STUDENTS_FOR_ADMIT_CARD_FAIL:
      return { loading: false, error: action.payload };
      case SEARCH_STUDENTS_FOR_ADMIT_CARD_RESET:
      return {};
    default:
      return state;
  }
};

export const printStudentsAdmitCardDataReducer = (state = {}, action) => {
  switch (action.type) {
    case PRINT_STUDENTS_ADMIT_CARD_REQUEST:
      return { loading: true };
    case PRINT_STUDENTS_ADMIT_CARD_SUCCESS:
      return {
        loading: false,
        printStudentsAdmitCard: action.payload,
        success: true,
      };
    case PRINT_STUDENTS_ADMIT_CARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
