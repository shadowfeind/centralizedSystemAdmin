import {
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_RESET,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS,
  GET_ALL_SCHOOL_VALUE_FAIL,
  GET_ALL_SCHOOL_VALUE_REQUEST,
  GET_ALL_SCHOOL_VALUE_RESET,
  GET_ALL_SCHOOL_VALUE_SUCCESS,
  GET_BULK_EXAM_APPROVAL_BLANK_PAGE_FAIL,
  GET_BULK_EXAM_APPROVAL_BLANK_PAGE_REQUEST,
  GET_BULK_EXAM_APPROVAL_BLANK_PAGE_RESET,
  GET_BULK_EXAM_APPROVAL_BLANK_PAGE_SUCCESS,
  GET_BULK_EXAM_APPROVAL_FAIL,
  GET_BULK_EXAM_APPROVAL_REQUEST,
  GET_BULK_EXAM_APPROVAL_RESET,
  GET_BULK_EXAM_APPROVAL_SUCCESS,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_FAIL,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_REQUEST,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_RESET,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_SUCCESS,
  GET_INITIAL_EXAM_APPORVAL_DATA_FAIL,
  GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST,
  GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS,
  POST_BULK_EXAM_APPROVAL_FAIL,
  POST_BULK_EXAM_APPROVAL_REQUEST,
  POST_BULK_EXAM_APPROVAL_RESET,
  POST_BULK_EXAM_APPROVAL_SUCCESS,
} from "./ExamMarkApprovalConstants";

export const getInitialExamApprovalDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS:
      return { loading: false, examApprovalInitialDatas: action.payload };
    case GET_INITIAL_EXAM_APPORVAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getExamApprovalSearchDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST:
      return { loading: true };
    case GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS:
      return { loading: false, searchData: action.payload, success: true };
    case GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL:
      return { loading: false, error: action.payload };
      case GET_ALL_EXAM_APPROVAL_SEARCHDATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getExamApprovalScheduleHeaderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_APPROVAL_SCHEULE_HEADER_REQUEST:
      return { loading: true };
    case GET_EXAM_APPROVAL_SCHEULE_HEADER_SUCCESS:
      return { loading: false, scheduleHeader: action.payload, success: true };
    case GET_EXAM_APPROVAL_SCHEULE_HEADER_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXAM_APPROVAL_SCHEULE_HEADER_RESET:
      return {};
    default:
      return state;
  }
};

export const getBulkExamApprovalSearchDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_EXAM_APPROVAL_REQUEST:
      return { loading: true };
    case GET_BULK_EXAM_APPROVAL_SUCCESS:
      return { loading: false, bulkData: action.payload, success: true };
    case GET_BULK_EXAM_APPROVAL_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_EXAM_APPROVAL_RESET:
      return {};
    default:
      return state;
  }
};

export const getBulkExamApprovalBlankDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_EXAM_APPROVAL_BLANK_PAGE_REQUEST:
      return { loading: true };
    case GET_BULK_EXAM_APPROVAL_BLANK_PAGE_SUCCESS:
      return { loading: false, bulkBlankData: action.payload, success: true };
    case GET_BULK_EXAM_APPROVAL_BLANK_PAGE_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_EXAM_APPROVAL_BLANK_PAGE_RESET:
      return {};
    default:
      return state;
  }
};

export const postBulkExamApprovalReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BULK_EXAM_APPROVAL_REQUEST:
      return { loading: true };
    case POST_BULK_EXAM_APPROVAL_SUCCESS:
      return { loading: false, success: true };
    case POST_BULK_EXAM_APPROVAL_FAIL:
      return { loading: false, error: action.payload };
    case POST_BULK_EXAM_APPROVAL_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllSchoolValueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SCHOOL_VALUE_REQUEST:
      return { loading: true };
    case GET_ALL_SCHOOL_VALUE_SUCCESS:
      return { loading: false, schoolValue: action.payload };
    case GET_ALL_SCHOOL_VALUE_FAIL:
      return { loading: false, error: action.payload };
      case GET_ALL_SCHOOL_VALUE_RESET:
        return {};
    default:
      return state;
  }
};
