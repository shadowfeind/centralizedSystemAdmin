import {
  DOWNLOAD_OLD_QUESTIONS_FAIL,
  DOWNLOAD_OLD_QUESTIONS_REQUEST,
  DOWNLOAD_OLD_QUESTIONS_RESET,
  DOWNLOAD_OLD_QUESTIONS_SUCCESS,
  GET_ALL_OLD_QUESTIONS_FAIL,
  GET_ALL_OLD_QUESTIONS_REQUEST,
  GET_ALL_OLD_QUESTIONS_RESET,
  GET_ALL_OLD_QUESTIONS_SUCCESS,
  GET_LIST_OF_OLD_QUESTIONS_FAIL,
  GET_LIST_OF_OLD_QUESTIONS_REQUEST,
  GET_LIST_OF_OLD_QUESTIONS_RESET,
  GET_LIST_OF_OLD_QUESTIONS_SUCCESS,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_FAIL,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_REQUEST,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_RESET,
  GET_SINGLE_TO_CREATE_OLD_QUESTIONS_SUCCESS,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_FAIL,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_REQUEST,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_RESET,
  GET_SINGLE_TO_EDIT_OLD_QUESTIONS_SUCCESS,
  GET_SUBJECT_OF_OLD_QUESTIONS_FAIL,
  GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST,
  GET_SUBJECT_OF_OLD_QUESTIONS_RESET,
  GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS,
  POST_FILE_UPLOAD_OLD_QUESTIONS_FAIL,
  POST_FILE_UPLOAD_OLD_QUESTIONS_REQUEST,
  POST_FILE_UPLOAD_OLD_QUESTIONS_RESET,
  POST_FILE_UPLOAD_OLD_QUESTIONS_SUCCESS,
  POST_OLD_QUESTIONS_FAIL,
  POST_OLD_QUESTIONS_REQUEST,
  POST_OLD_QUESTIONS_RESET,
  POST_OLD_QUESTIONS_SUCCESS,
  PUT_OLD_QUESTIONS_FAIL,
  PUT_OLD_QUESTIONS_REQUEST,
  PUT_OLD_QUESTIONS_RESET,
  PUT_OLD_QUESTIONS_SUCCESS,
} from "./OldQuestionsConstants";

export const getAllOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_ALL_OLD_QUESTIONS_SUCCESS:
      return { loading: false, allOldQuestions: action.payload };
    case GET_ALL_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const getListOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_OF_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_LIST_OF_OLD_QUESTIONS_SUCCESS:
      return { loading: false, listOldQuestions: action.payload };
    case GET_LIST_OF_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_OF_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSubjectOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS:
      return { loading: false, subjectOldQuestions: action.payload };
    case GET_SUBJECT_OF_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SUBJECT_OF_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_OLD_QUESTIONS_SUCCESS:
      return { loading: false, singleCreateOldQuestions: action.payload };
    case GET_SINGLE_TO_CREATE_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_OLD_QUESTIONS_SUCCESS:
      return { loading: false, singleEditOldQuestions: action.payload };
    case GET_SINGLE_TO_EDIT_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const putOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case PUT_OLD_QUESTIONS_SUCCESS:
      return { loading: false, success: true };
    case PUT_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case PUT_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const postOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case POST_OLD_QUESTIONS_SUCCESS:
      return { loading: false, success: true };
    case POST_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case POST_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const downloadOldQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_OLD_QUESTIONS_REQUEST:
      return { loading: true };
    case DOWNLOAD_OLD_QUESTIONS_SUCCESS:
      return { loading: false, success: true };
    case DOWNLOAD_OLD_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_OLD_QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};
