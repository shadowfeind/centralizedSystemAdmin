import {
  DELETE_EXAM_SCHEDULE_FAIL,
  DELETE_EXAM_SCHEDULE_REQUEST,
  DELETE_EXAM_SCHEDULE_RESET,
  DELETE_EXAM_SCHEDULE_SUCCESS,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS,
  GET_EVENT_FOR_EXAM_SCHEDULE_FAIL,
  GET_EVENT_FOR_EXAM_SCHEDULE_REQUEST,
  GET_EVENT_FOR_EXAM_SCHEDULE_RESET,
  GET_EVENT_FOR_EXAM_SCHEDULE_SUCCESS,
  GET_EXAM_SCHEDULE_LIST_FAIL,
  GET_EXAM_SCHEDULE_LIST_REQUEST,
  GET_EXAM_SCHEDULE_LIST_RESET,
  GET_EXAM_SCHEDULE_LIST_SUCCESS,
  GET_GENERATE_EXAM_SCHEDULE_FAIL,
  GET_GENERATE_EXAM_SCHEDULE_REQUEST,
  GET_GENERATE_EXAM_SCHEDULE_RESET,
  GET_GENERATE_EXAM_SCHEDULE_SUCCESS,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_FAIL,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_RESET,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_FAIL,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_REQUEST,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_RESET,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS,
  POST_GENERATE_EXAM_SCHEDULE_FAIL,
  POST_GENERATE_EXAM_SCHEDULE_REQUEST,
  POST_GENERATE_EXAM_SCHEDULE_RESET,
  POST_GENERATE_EXAM_SCHEDULE_SUCCESS,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_FAIL,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_RESET,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS,
  SINGLE_EXAM_SCHEDULE_EDIT_FAIL,
  SINGLE_EXAM_SCHEDULE_EDIT_REQUEST,
  SINGLE_EXAM_SCHEDULE_EDIT_RESET,
  SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS,
} from "./ExamScheduleConstants";

export const getAllExamScheduleInitialDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS:
      return { loading: false, examScheduleInitialData: action.payload };
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getEventForExamScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_FOR_EXAM_SCHEDULE_REQUEST:
      return { loading: true };
    case GET_EVENT_FOR_EXAM_SCHEDULE_SUCCESS:
      return { loading: false, eventExamSchedule: action.payload };
    case GET_EVENT_FOR_EXAM_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case GET_EVENT_FOR_EXAM_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const getExamScheduleListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_SCHEDULE_LIST_REQUEST:
      return { loading: true };
    case GET_EXAM_SCHEDULE_LIST_SUCCESS:
      return { loading: false, examScheduleList: action.payload };
    case GET_EXAM_SCHEDULE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXAM_SCHEDULE_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleExamScheduleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST:
      return { loading: true };
    case GET_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS:
      return { loading: false, singleExamScheduleCreate: action.payload };
    case GET_SINGLE_EXAM_SCHEDULE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EXAM_SCHEDULE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postSingleExamScheduleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST:
      return { loading: true };
    case POST_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POST_SINGLE_EXAM_SCHEDULE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_SINGLE_EXAM_SCHEDULE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleExamScheduleEditReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EXAM_SCHEDULE_EDIT_REQUEST:
      return { loading: true };
    case GET_SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS:
      return { loading: false, singleExamScheduleEdit: action.payload };
    case GET_SINGLE_EXAM_SCHEDULE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EXAM_SCHEDULE_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const singleExamScheduleEditReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_EXAM_SCHEDULE_EDIT_REQUEST:
      return { loading: true };
    case SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS:
      return { loading: false, success: true };
    case SINGLE_EXAM_SCHEDULE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_EXAM_SCHEDULE_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteExamScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXAM_SCHEDULE_REQUEST:
      return { loading: true };
    case DELETE_EXAM_SCHEDULE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_EXAM_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_EXAM_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const getToGenerateExamScheduleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_GENERATE_EXAM_SCHEDULE_REQUEST:
      return { loading: true };
    case GET_GENERATE_EXAM_SCHEDULE_SUCCESS:
      return {
        loading: false,
        getToGenerateExamScheduleCreate: action.payload,
      };
    case GET_GENERATE_EXAM_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case GET_GENERATE_EXAM_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const postGenerateExamScheduleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_GENERATE_EXAM_SCHEDULE_REQUEST:
      return { loading: true };
    case POST_GENERATE_EXAM_SCHEDULE_SUCCESS:
      return { loading: false, success: true, eventName: action.payload };
    case POST_GENERATE_EXAM_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case POST_GENERATE_EXAM_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};
