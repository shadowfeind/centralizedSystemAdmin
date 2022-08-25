import {
  DELETE_CLASS_SUBJECT_FAIL,
  DELETE_CLASS_SUBJECT_REQUEST,
  DELETE_CLASS_SUBJECT_RESET,
  DELETE_CLASS_SUBJECT_SUCCESS,
  GET_ALL_CLASS_SUBJECT_FAIL,
  GET_ALL_CLASS_SUBJECT_REQUEST,
  GET_ALL_CLASS_SUBJECT_RESET,
  GET_ALL_CLASS_SUBJECT_SUCCESS,
  GET_CLASS_SUBJECT_LIST_FAIL,
  GET_CLASS_SUBJECT_LIST_REQUEST,
  GET_CLASS_SUBJECT_LIST_RESET,
  GET_CLASS_SUBJECT_LIST_SUCCESS,
  GET_SINGLE_CLASS_SUBJECT_FAIL,
  GET_SINGLE_CLASS_SUBJECT_REQUEST,
  GET_SINGLE_CLASS_SUBJECT_RESET,
  GET_SINGLE_CLASS_SUBJECT_SUCCESS,
  GET_TO_CREATE_CLASS_SUBJECT_FAIL,
  GET_TO_CREATE_CLASS_SUBJECT_REQUEST,
  GET_TO_CREATE_CLASS_SUBJECT_RESET,
  GET_TO_CREATE_CLASS_SUBJECT_SUCCESS,
  POST_TO_CREATE_CLASS_SUBJECT_FAIL,
  POST_TO_CREATE_CLASS_SUBJECT_REQUEST,
  POST_TO_CREATE_CLASS_SUBJECT_RESET,
  POST_TO_CREATE_CLASS_SUBJECT_SUCCESS,
  UPDATE_SINGLE_CLASS_SUBJECT_FAIL,
  UPDATE_SINGLE_CLASS_SUBJECT_REQUEST,
  UPDATE_SINGLE_CLASS_SUBJECT_RESET,
  UPDATE_SINGLE_CLASS_SUBJECT_SUCCESS,
} from "./ClassSubjectConstants";

export const getAllClassSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CLASS_SUBJECT_REQUEST:
      return { loading: true };
    case GET_ALL_CLASS_SUBJECT_SUCCESS:
      return { loading: false, allClassSubjects: action.payload };
    case GET_ALL_CLASS_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_CLASS_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const getClassSubjectListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLASS_SUBJECT_LIST_REQUEST:
      return { loading: true };
    case GET_CLASS_SUBJECT_LIST_SUCCESS:
      return { loading: false, listClassSubjects: action.payload };
    case GET_CLASS_SUBJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GET_CLASS_SUBJECT_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleClassSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CLASS_SUBJECT_REQUEST:
      return { loading: true };
    case GET_SINGLE_CLASS_SUBJECT_SUCCESS:
      return { loading: false, singleClassSubject: action.payload };
    case GET_SINGLE_CLASS_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_CLASS_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleClassSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_CLASS_SUBJECT_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_CLASS_SUBJECT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SINGLE_CLASS_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_CLASS_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const getToCreateClassSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TO_CREATE_CLASS_SUBJECT_REQUEST:
      return { loading: true };
    case GET_TO_CREATE_CLASS_SUBJECT_SUCCESS:
      return { loading: false, createClassSubjects: action.payload };
    case GET_TO_CREATE_CLASS_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_TO_CREATE_CLASS_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const postToCreateClassSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_TO_CREATE_CLASS_SUBJECT_REQUEST:
      return { loading: true };
    case POST_TO_CREATE_CLASS_SUBJECT_SUCCESS:
      return { loading: false, success: true };
    case POST_TO_CREATE_CLASS_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case POST_TO_CREATE_CLASS_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteClassSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CLASS_SUBJECT_REQUEST:
      return { loading: true };
    case DELETE_CLASS_SUBJECT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_CLASS_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_CLASS_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

