import {
  GET_ALL_SYLLABUS_FAIL,
  GET_ALL_SYLLABUS_REQUEST,
  GET_ALL_SYLLABUS_RESET,
  GET_ALL_SYLLABUS_SUCCESS,
  GET_LIST_SYLLABUS_FAIL,
  GET_LIST_SYLLABUS_REQUEST,
  GET_LIST_SYLLABUS_RESET,
  GET_LIST_SYLLABUS_SUCCESS,
  GET_SINGLE_TO_EDIT_SYLLABUS_FAIL,
  GET_SINGLE_TO_EDIT_SYLLABUS_REQUEST,
  GET_SINGLE_TO_EDIT_SYLLABUS_RESET,
  GET_SINGLE_TO_EDIT_SYLLABUS_SUCCESS,
  PUT_SYLLABUS_FAIL,
  PUT_SYLLABUS_REQUEST,
  PUT_SYLLABUS_RESET,
  PUT_SYLLABUS_SUCCESS,
} from "./SyllabusConstants";

export const getAllSyllabusReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SYLLABUS_REQUEST:
      return { loading: true };
    case GET_ALL_SYLLABUS_SUCCESS:
      return { loading: false, allSyllabus: action.payload };
    case GET_ALL_SYLLABUS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SYLLABUS_RESET:
      return {};
    default:
      return state;
  }
};

export const getListSyllabusReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_SYLLABUS_REQUEST:
      return { loading: true };
    case GET_LIST_SYLLABUS_SUCCESS:
      return { loading: false, listSyllabus: action.payload };
    case GET_LIST_SYLLABUS_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_SYLLABUS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleToEditSyllabusReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_TO_EDIT_SYLLABUS_REQUEST:
        return { loading: true };
      case GET_SINGLE_TO_EDIT_SYLLABUS_SUCCESS:
        return { loading: false, singleToEditSyllabus: action.payload };
      case GET_SINGLE_TO_EDIT_SYLLABUS_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_TO_EDIT_SYLLABUS_RESET:
        return {};
      default:
        return state;
    }
  };

  export const putSyllabusReducer = (state = {}, action) => {
    switch (action.type) {
      case PUT_SYLLABUS_REQUEST:
        return { loading: true };
      case PUT_SYLLABUS_SUCCESS:
        return { loading: false, success: true };
      case PUT_SYLLABUS_FAIL:
        return { loading: false, error: action.payload };
      case PUT_SYLLABUS_RESET:
        return {};
      default:
        return state;
    }
  };
  
  
