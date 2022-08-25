import {
  GET_EVENT_FOR_EXAM_MARK_FAIL,
  GET_EVENT_FOR_EXAM_MARK_REQUEST,
  GET_EVENT_FOR_EXAM_MARK_RESET,
  GET_EVENT_FOR_EXAM_MARK_SUCCESS,
  GET_EXAM_LEDGER_HEADER_FAIL,
  GET_EXAM_LEDGER_HEADER_REQUEST,
  GET_EXAM_LEDGER_HEADER_RESET,
  GET_EXAM_LEDGER_HEADER_SUCCESS,
  GET_EXAM_RESULT_LIST_FAIL,
  GET_EXAM_RESULT_LIST_REQUEST,
  GET_EXAM_RESULT_LIST_RESET,
  GET_EXAM_RESULT_LIST_SUCCESS,
  GET_INITIAL_EXAM_RESULT_DATA_FAIL,
  GET_INITIAL_EXAM_RESULT_DATA_REQUEST,
  GET_INITIAL_EXAM_RESULT_DATA_SUCCESS,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_FAIL,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_REQUEST,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_SUCCESS,
  PRINT_EXAM_RESULT_COUNT_FAIL,
  PRINT_EXAM_RESULT_COUNT_REQUEST,
  PRINT_EXAM_RESULT_COUNT_RESET,
  PRINT_EXAM_RESULT_COUNT_SUCCESS,
  PRINT_EXAM_RESULT_FAIL,
  PRINT_EXAM_RESULT_REQUEST,
  PRINT_EXAM_RESULT_RESET,
  PRINT_EXAM_RESULT_SUCCESS,
  PRINT_FINAL_RESULT_FAIL,
  PRINT_FINAL_RESULT_REQUEST,
  PRINT_FINAL_RESULT_RESET,
  PRINT_FINAL_RESULT_SUCCESS,
} from "./ExamResultConstants";

export const getInitialExamResultDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_EXAM_RESULT_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_EXAM_RESULT_DATA_SUCCESS:
      return { loading: false, examResultInitialDatas: action.payload };
    case GET_INITIAL_EXAM_RESULT_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getEventForExamMarkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_FOR_EXAM_MARK_REQUEST:
      return { loading: true };
    case GET_EVENT_FOR_EXAM_MARK_SUCCESS:
      return {
        loading: false,
        allEventsForExamMark: action.payload,
        success: true,
      };
    case GET_EVENT_FOR_EXAM_MARK_FAIL:
      return { loading: false, error: action.payload };
    case GET_EVENT_FOR_EXAM_MARK_RESET:
      return {};
    default:
      return state;
  }
};

export const getInitialExamResultStudentOptionsReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_REQUEST:
      return { loading: true };
    case GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_SUCCESS:
      return {
        loading: false,
        studentOptionsForExamMark: action.payload,
        success: true,
      };
    case GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_FAIL:
      return { loading: false, error: action.payload };
    case GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const getExamResultListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_RESULT_LIST_REQUEST:
      return { loading: true };
    case GET_EXAM_RESULT_LIST_SUCCESS:
      return {
        loading: false,
        examResultList: action.payload,
      };
    case GET_EXAM_RESULT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXAM_RESULT_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getExamLedgerHeaderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_LEDGER_HEADER_REQUEST:
      return { loading: true };
    case GET_EXAM_LEDGER_HEADER_SUCCESS:
      return {
        loading: false,
        examLedgerHeader: action.payload,
      };
    case GET_EXAM_LEDGER_HEADER_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXAM_LEDGER_HEADER_RESET:
      return {};
    default:
      return state;
  }
};

export const printExamResultReducer = (state = {}, action) => {
  switch (action.type) {
    case PRINT_EXAM_RESULT_REQUEST:
      return { loading: true };
    case PRINT_EXAM_RESULT_SUCCESS:
      return {
        loading: false,
        printExamResult: action.payload,
        success: true,
      };
    case PRINT_EXAM_RESULT_FAIL:
      return { loading: false, error: action.payload };
    case PRINT_EXAM_RESULT_RESET:
      return {};
    default:
      return state;
  }
};

export const printExamResultCountReducer = (state = {}, action) => {
  switch (action.type) {
    case PRINT_EXAM_RESULT_COUNT_REQUEST:
      return { loading: true };
    case PRINT_EXAM_RESULT_COUNT_SUCCESS:
      return {
        loading: false,
        printExamResultCount: action.payload,
        success: true,
      };
    case PRINT_EXAM_RESULT_COUNT_FAIL:
      return { loading: false, error: action.payload };
    case PRINT_EXAM_RESULT_COUNT_RESET:
      return {};
    default:
      return state;
  }
};

export const printFinalResultReducer = (state = {}, action) => {
  switch (action.type) {
    case PRINT_FINAL_RESULT_REQUEST:
      return { loading: true };
    case PRINT_FINAL_RESULT_SUCCESS:
      return {
        loading: false,
        printFinalResult: action.payload,
        success: true,
      };
    case PRINT_FINAL_RESULT_FAIL:
      return { loading: false, error: action.payload };
    case PRINT_FINAL_RESULT_RESET:
      return {};
    default:
      return state;
  }
};
